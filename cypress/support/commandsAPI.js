Cypress.Commands.add('getToken', () => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
           "email":"gscode@gscode.com.br",
           "senha":"123",
           "redirecionar":false
        }
    }).its('body.token').should('not.be.empty')
    .then(token => {
        return token
    })
})