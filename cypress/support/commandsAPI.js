Cypress.Commands.add('getToken', () => {
    cy.request({
        method: 'POST',
        url: '/signin',
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

Cypress.Commands.add('resetRest', () => {
    cy.getToken().then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`}
        }).its('status').should('be.eq', 200)
    })
})