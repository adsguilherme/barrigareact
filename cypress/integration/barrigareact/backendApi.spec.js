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
        //cy.resetApp()                 // reset após cada cenário executado  
    })

    it('Deve inserir uma conta', () => {
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
                url: 'http://barrigarest.wcaquino.me/contas',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    "nome": "Conta via API"
            }
        }).as('response')                                 // .then(res => console.log(res));

        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via API')
        })

    })

    it('Deve alterar uma conta', () => {
        

    })

    it('Não deve criar uma conta com o mesmo nome', () => {

    })

    it('Deve criar uma transação', () => {
        
    })
    
    it('Deve pegar o saldo', () => {

    })
    
    it('Deve remover uma movimentação', () => {

    })

})
