/// <reference types="cypress" />

import '../../support/commandsAPI'

describe('Deve testar o nível funcional', () => {
    
    let token
    
    before(() => {
        cy.getToken()
            .then(tkn => {
                token = tkn
            })    
    })
        
    beforeEach(() => {
        cy.resetRest()                 // reset após cada cenário executado  
    })

    it('Deve criar uma conta', () => {
        //  cy.request({
        //      method: 'POST',
        //      url: 'https://barrigarest.wcaquino.me/signin',
        //      body: {
        //         "email":"gscode@gscode.com.br",
        //         "senha":"123",
        //         "redirecionar":false
        //      }
        //  }).its('body.token').should('not.be.empty')         // .then(res => console.log(res));
         
        cy.request({
                method: 'POST',
                url: '/contas',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta via API'
            }
        }).as('response')                                 // .then(res => console.log(res));

        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via API')
        })

    })

    it('Deve alterar uma conta', () => {
        cy.getAccountByName('Conta para alterar')
        // cy.request({
        //     method: 'GET',
        //     url: '/contas',
        //     headers: { Authorization: `JWT ${token}` },
        //     qs: {                                               // query string
        //         nome: 'Conta para alterar'
        //     }
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'conta alterada via rest'
                    }
                }).as('response')
            })
        
        cy.get('@response').its('status').should('be.equal', 200)

    })

    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false         // Cenários que o status code é diferente de 200, 201 e 204, deve usar essa 'propriedade' do failOnStatusCode definido como false.
        }).as('response')                                 
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
        
    })
    
    it('Deve criar uma transação', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(contaId => {                                      // Retorno é chamado de contaId
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}`},
                    body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),   // formatando para apresentar data atual + 1 dia (será a data de amanhã).
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),                  // formatando para apresentar data atual.
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    }
                }).as('response') // A requisição da linha 92 a 104, foi dado um alias (linha 106).
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    
    it('Deve pegar o saldo', () => {

    })
    
    it('Deve remover uma movimentação', () => {

    })

})
