const buildEnv = () => {
  cy.server()

  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      id: 1986,
      nome: 'user fake',
      token: 'token fake'
    }
  }).as('Signin da aplicação')

  cy.route({
    method: 'GET',
    url: '/saldo',
    response: [{
      conta_id: 2019,
      conta: 'Conta fake 01',
      saldo: '888.00'
    },

    {
      conta_id: 2020,
      conta: 'Conta fake 02',
      saldo: '999.00'
    }
    ]
  }).as('Saldo da aplicação')

  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      { id: 1, nome: 'Carteira01', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 }
    ]
  }).as('contasGet')

  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      { id: 1, nome: 'Carteira01', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 }
    ]
  }).as('contasGet')

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [
      { conta: 'Conta para movimentacoes', id: 495727, descricao: 'Movimentacao para exclusao', envolvido: 'AAA', observacao: null, tipo: 'DESP', data_transacao: '2021-04-10T03:00:00.000Z', data_pagamento: '2021-04-10T03:00:00.000Z', valor: '-1500.00', status: true, conta_id: 536402, usuario_id: 13102, transferencia_id: null, parcelamento_id: null },
      { conta: 'Conta com movimentacao', id: 495728, descricao: 'Movimentacao de conta', envolvido: 'BBB', observacao: null, tipo: 'DESP', data_transacao: '2021-04-10T03:00:00.000Z', data_pagamento: '2021-04-10T03:00:00.000Z', valor: '-1500.00', status: true, conta_id: 536403, usuario_id: 13102, transferencia_id: null, parcelamento_id: null },
      { conta: 'Conta para saldo', id: 495729, descricao: 'Movimentacao 1, calculo saldo', envolvido: 'CCC', observacao: null, tipo: 'REC', data_transacao: '2021-04-10T03:00:00.000Z', data_pagamento: '2021-04-10T03:00:00.000Z', valor: '3500.00', status: false, conta_id: 536404, usuario_id: 13102, transferencia_id: null, parcelamento_id: null },
      { conta: 'Conta para saldo', id: 495730, descricao: 'Movimentacao 2, calculo saldo', envolvido: 'DDD', observacao: null, tipo: 'DESP', data_transacao: '2021-04-10T03:00:00.000Z', data_pagamento: '2021-04-10T03:00:00.000Z', valor: '-1000.00', status: true, conta_id: 536404, usuario_id: 13102, transferencia_id: null, parcelamento_id: null },
      { conta: 'Conta para saldo', id: 495731, descricao: 'Movimentacao 3, calculo saldo', envolvido: 'EEE', observacao: null, tipo: 'REC', data_transacao: '2021-04-10T03:00:00.000Z', data_pagamento: '2021-04-10T03:00:00.000Z', valor: '1534.00', status: true, conta_id: 536404, usuario_id: 13102, transferencia_id: null, parcelamento_id: null },
      { conta: 'Conta para extrato', id: 495732, descricao: 'Movimentacao para extrato', envolvido: 'FFF', observacao: null, tipo: 'DESP', data_transacao: '2021-04-10T03:00:00.000Z', data_pagamento: '2021-04-10T03:00:00.000Z', valor: '-220.00', status: true, conta_id: 536405, usuario_id: 13102, transferencia_id: null, parcelamento_id: null }
    ]
  })
}

export default buildEnv
