/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar o nível funcional', () => {
    before(() => {
        cy.login()
        cy.resetApp()
        // cy.visit('http://barrigareact.wcaquino.me/')
        // cy.get(loc.LOGIN.USER).type('gscode@gscode.com.br')
        // cy.get(loc.LOGIN.PASSWORD).type('123')
        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    });

    it.only('Deve inserir uma conta', () => {
        cy.acessarMenuConta()
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()

        cy.inserirConta('Conta de teste')
        // cy.get(loc.CONTAS.NOME).type('Conta de teste')
        // cy.get(loc.CONTAS.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
        
    });

    it('Deve alterar uma conta', () => {
        
        cy.acessarMenuConta()
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta de teste')).click() 
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada') 
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')   

    });

    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    });

    it('Deve criar uma transação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7) // Have.length sginifica: que tenha o tamanho x. Nesse 
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
        
    });
    
    it('Deve pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', '123,00')
    });
    
    it('Deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Desc')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    });

})

// span que contenha 'Desc' em qualquer ponto (o uso de ., significa 'qualquer ponto') e seu irmão small contenha o valor '123'.