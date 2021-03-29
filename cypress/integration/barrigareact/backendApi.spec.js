/// <reference types="cypress" />

import '../../support/commandsAPI'

describe('Deve testar o nível API', () => {
    
    let token
    
    before(() => {
        cy.getToken()
            .then(tkn => {
                token = tkn
            })    
    })
        
    beforeEach(() => {
        cy.resetRest()                 // reset após cada cenário executado  
    })

    it('Deve criar uma conta', () => {
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
                url: '/contas',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta via API'
            }
        }).as('response')                                 // .then(res => console.log(res));

        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via API')
        })

    })

    it('Deve alterar uma conta', () => {
        cy.getAccountByName('Conta para alterar')
        // cy.request({
        //     method: 'GET',
        //     url: '/contas',
        //     headers: { Authorization: `JWT ${token}` },
        //     qs: {                                               // query string
        //         nome: 'Conta para alterar'
        //     }
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'conta alterada via rest'
                    }
                }).as('response')
            })
        
        cy.get('@response').its('status').should('be.equal', 200)

    })

    it('Não deve criar uma conta com o mesmo nome', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false         // Cenários que o status code é diferente de 200, 201 e 204, deve usar essa 'propriedade' do failOnStatusCode definido como false.
        }).as('response')                                 
        
        cy.get('@response').then(res => {
            expect(res.status).to.be.eq(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
        
    })
    
    it('Deve criar uma transação', () => {
        cy.getAccountByName('Conta para movimentacoes')
            .then(contaId => {                                      // Retorno é chamado de contaId
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}`},
                    body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),   // formatando para apresentar data atual + 1 dia (será a data de amanhã).
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),                  // formatando para apresentar data atual.
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    }
                }).as('response') // A requisição da linha 92 a 104, foi dado um alias (linha 106).
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    
    it.only('Deve pegar o saldo', () => {
        /*                                                         // Exemplo de como executar e identificar no devTools do browser na aba console.
        *    cy.request({                                          // É possível ver o array com os lançamentos da tela de saldo. Neste caso da aplicação sempre irá apresentar 4 registros. 
        *        method: 'GET',
        *        url: '/saldo',
        *        headers: { Authorization: `JWT ${ token }`}
        *    }).then(res => console.log(res))
        */

        cy.request({                                          
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${ token }`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo')     // Utilizando == ou === o teste passou
                    saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${ token }` },
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            cy.request({
                method: 'PUT',
                url: `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${ token }` },
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id 
                }
            }).its('status').should('be.equal', 200)

        })

        cy.request({                                          
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${ token }`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo')     // Utilizando == ou === o teste passou
                    saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })

    })
    
    it.only('Deve remover uma movimentação', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${ token }` },
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res => {
           cy.request({
               method: 'DELETE',
               url: `/transacoes/${res.body[0].id}`,
               headers: { Authorization: `JWT ${ token }` },
           }).its('status').should('be.equal', 204)
        })
    })
})
