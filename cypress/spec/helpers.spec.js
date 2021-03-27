/// <reference types="cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 99}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        

        const promise = new Promise ((resolve, reject) => {
            setTimeout(() =>{
                resolve(10)
            }, 500)
        });

    });
});