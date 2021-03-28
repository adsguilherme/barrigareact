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

Cypress.Commands.add('getAccountByName', name => {
    cy.getToken().then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                nome: name
            }
        }).then(res => {
            return res.body[0].id
        })
    })
})