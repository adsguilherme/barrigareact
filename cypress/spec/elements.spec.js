/// <reference types="cypress" />

describe('Trabalhando com elementos básicos', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {
    cy.reload()
  })

  it('Texto', () => {
    cy.get('body').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    cy.get('span').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    // FIXME Utiliza o CSS selector e depois aplica o have.text com o texto que deseja validar
    cy.get('span[class="facilAchar"]').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  })

  it('Link', () => {
    cy.get('a[href="#"]').click()
    cy.get('div[id="resultado"]').should('have.text', 'Voltou!')
  })

  it('Campos de Text', () => {
    // Preenchendo campos de texto
    cy.get('#formNome')
      .type('Cypress Teste')
      .should('have.value', 'Cypress Teste')

    // O uso do {backspace} apagou o número 5. Caso queira apagar o 4, colocar outro {backspace}, ficando ('Teste12345{backspace}backspace}')
    cy.get('[data-cy=dataSobrenome]')
      .type('Teste12345{backspace}')

    cy.get('textarea[id="elementosForm:sugestoes"]')
      .type('textarea')
      .should('have.value', 'textarea') // para text area se usa have.value

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type('???')

    cy.get('textarea[id="elementosForm:sugestoes"]')
      .clear()
    // o selectall irá selecionar todo o texto do text área e depois trocará pela palavra Acerto.
    // O uso do delay é para poder conseguir visualizar o processo.
      .type('Erro1Erro2Erro3{selectall}Acerto', { delay: 200 })
      .should('have.value', 'Acerto')
  })

  it('RadioButton', () => {
    cy.get('input[id="formSexoFem"]')
      .click()
      .should('be.checked')

    // Validando se o radio não está selecionado
    cy.get('input[id="formSexoMasc"]').should('not.be.checked')

    // Validando se existem 2 radios buttons na tela
    cy.get('input[name="formSexo"]').should('have.length', 2)
  })

  it('CheckButton', () => {
    cy.get('input[id="formComidaPizza"]')
      .click()
      .should('be.checked')

    // Utilizando o ({ multiple: true }), irá selecionar todos os check buttons que fazem parte do elemento (name) e valor ("formComidaFavorita)
    // Exemplo: name="formComidaFavorita
    cy.get('input[name="formComidaFavorita"]').click({ multiple: true })

    cy.get('input[id="formComidaPizza"]').should('not.be.checked')
    cy.get('input[id="formComidaVegetariana"]').should('be.checked')
  })

  it('Combo', () => {
    cy.get('select[data-test=dataEscolaridade]')
      .select('2graucomp')
      .should('have.value', '2graucomp')

    // TODO validar as opções existente do combo
  })

  it.only('Combo Múltiplo', () => {
    cy.get('select[data-testid="dataEsportes"]')
      .select(['natacao', 'Corrida', 'Karate'])
    // Olhando na inspeção de elementos a palavra natacao está com o 'n' minúsculo.
    // Se passar no array do select com 'N', irá selecionar apenas 'Corrida'.

    // TODO validar opções selecionadas do combo múltiplo para uso do should
  })
})
