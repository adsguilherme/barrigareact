/// <reference types="cypress" />


describe('Deve testar o nível funcional', () => {
    before(() => {
        //cy.login()
       
    })
        
    beforeEach(() => {
        //cy.resetApp()                 // reset após cada cenário executado  
    })

    it('Deve inserir uma conta', () => {
         cy.request({
             method: 'POST',
             url: 'https://barrigarest.wcaquino.me/signin',
             body: {
                "email":"gscode@gscode.com.br",
                "senha":"123",
                "redirecionar":false
             }
         }).its('body.token').should('not.be.empty')         // .then(res => console.log(res));
         .then(token => {

            cy.request({
                 method: 'POST',
                 url: 'http://barrigarest.wcaquino.me/contas',
                 headers: { Authorization: `JWT ${token}`},
                 body: {
                     "nome": "Conta via API"
                }
            }).then(res => console.log(res));
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
