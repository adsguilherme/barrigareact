/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar o nível funcional', () => {
    before(() => {
        cy.login()
        // cy.visit('http://barrigareact.wcaquino.me/')
        // cy.get(loc.LOGIN.USER).type('gscode@gscode.com.br')
        // cy.get(loc.LOGIN.PASSWORD).type('123')
        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })
        
    beforeEach(() => {
        cy.get(loc.MENU.HOME).click() // padronizando inicialização
        cy.resetApp()                 // reset após cada cenário executado  
    })

    it('Deve inserir uma conta', () => {
        cy.acessarMenuConta()
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()

        cy.inserirConta('Conta de teste')
        // cy.get(loc.CONTAS.NOME).type('Conta de teste')
        // cy.get(loc.CONTAS.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
        
    })

    it('Deve alterar uma conta', () => {
        
        cy.acessarMenuConta()
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click() 
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada') 
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')   

    })

    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('Deve criar uma transação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7) // Have.length sginifica: que tenha o tamanho x. Nesse 
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
        
    })
    
    it('Deve pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        //cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')


    })
    
    it('Deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

})

// span que contenha 'Desc' em qualquer ponto (o uso de ., significa 'qualquer ponto') e seu irmão small contenha o valor '123'.