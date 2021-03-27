/// <reference types="cypress" />

describe('Trabalhando com popup', () => {
    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })    

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click();
        cy.get('@winOpen').should('be.called') // @ serve para referenciar o alias
    });


    describe.only('Com links', () => {
        beforeEach('', () => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })
        it('Check popup url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href') 
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        
        })

        // Essa estratégia é útil quando o link da página não é fixo.
        // Sendo realizado seu acesso através do a href.
        it('Deve acessar o popup dinamicamente', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })
        
        it('Deve forçar um link na mesma página', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target')
                .click()
            cy.get('#tfield').type('funciona')
        })

    });

});    