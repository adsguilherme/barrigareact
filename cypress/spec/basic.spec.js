/// <reference types="cypress" />

// https://wcaquino.me/cypress/componentes.html

describe('Cypress Basic', () => {
    it('Deve visitar uma página e fazer uma assertiva do título', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        //cy.pause()

        // const title = cy.title()
        // console.log(title)

        // Mostrando que na url tem a palavra componentes
        cy.url().should('contain','componentes')
        // Mostrando que na página de componentes o título da página é 'Campo de Treinamento'
        cy.title().should('to.be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')//.debug()

        cy.title().then(title =>{ //.then ou .should podem ser usados
            console.log(title)
        })

    });

    it('Deve encontrar e interagir com um elemento', () => {
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    });
});