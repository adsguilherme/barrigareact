/// <reference types="cypress" />

describe('Esperas...', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  before(() => {
    cy.reload()
  })

  it('Deve aguardar elemento estar disponível', () => {
    cy.get('input[id="novoCampo"]').should('not.exist')
    cy.get(' input[id="buttonDelay"]').click()
    cy.get('input[id="novoCampo"]').should('not.exist')
    cy.get('input[id="novoCampo"]').should('exist')
    cy.get('input[id="novoCampo"]').type('funciona')
  })

  it('Deve realizar Retrys', () => {
    cy.get('input[id="novoCampo"]').should('not.exist')
    cy.get(' input[id="buttonDelay"]').click()
    cy.get('input[id="novoCampo"]').should('not.exist')
    cy.get('input[id="novoCampo"]')
      .should('exist')
      .type('funciona')
  })

  it.only('Uso do Find', () => {
    cy.get('input[id="buttonList"]').click()
    // cy.get('ul[id="lista"] span')
    cy.get('ul[id="lista"] li')
      .find('span') // Funciona se descomentar a linha 31 e comentar a linha 33.
      .should('contain', 'Item 1')

    // cy.get('ul[id="lista"] li')
    // .find('span')
    // .should('contain', 'Item 2')

    cy.get('ul[id="lista"] li span')
      .should('contain', 'Item 2')
  })

  it('Uso do Find 2', () => {
    cy.get('input[id="buttonListDOM"]').click()
    cy.get('ul[id="lista"] li')
      .find('span')
      .should('contain', 'Item 1')

    // cy.get('ul[id="lista"] li')
    // .find('span')
    // .should('contain', 'Item 2')

    cy.get('ul[id="lista"] li span')
      .should('contain', 'Item 2')
  })

  it('Uso do timeout', () => {
    // cy.get(' input[id="buttonDelay"]').click()
    // cy.get('input[id="novoCampo"]', { timeout: 1000 }).should('exist')

    // cy.get('input[id="buttonListDOM"]').click()
    // //cy.wait(5000);
    // cy.get('ul[id="lista"] li span', ({ timeout: 3000 }))
    //     .should('contain', 'Item 2')

    cy.get('input[id="buttonListDOM"]').click()
    cy.get('ul[id="lista"] li span')
      .should('have.length', '1')
    cy.get('ul[id="lista"] li span')
      .should('have.length', '2')
  })

  it('Click Retry', () => {
    cy.get('#buttonCount')
      .click()
      .should('have.value', '1')
  })

  it.only('Should vs Then', () => {
    cy.get('input[id="buttonListDOM"]').then(($el) => {
      // .should('have.length', 1)
      // console.log($el)
      expect($el).to.have.length(1)
      return 2
    }).and('have.id', 'buttonListDOM')
  })
})

/*

No arquivo cypress.json configurar o timeout para toda a aplicação.

{
"defaultCommandtimeout": 6000
}

Porém não é recomendado. Caso tenha algum teste que tenha um timeout alto, configurar no teste específico que ocorre esse comportamento.
Igual a linha

    it.only('Uso do timeout', () => {
        cy.get(' input[id="buttonDelay"]').click()
        cy.get('input[id="novoCampo"]', { timeout: 1000 }).should('exist')
    });
});

Diferença do timeout para o wait é:
* timeout = definindo um valor a aplicação pode responder antes do tempo definido.
* wait = definindo um valor a aplicação irá responder dentro do tempo definido. Não sendo muito recomendado o seu uso.

*/
