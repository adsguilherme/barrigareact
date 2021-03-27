const locators = {
    LOGIN: {                                    // LOGIN é uma propriedade
        USER: '[data-test=email]',              // USER, PASSWORD e BTN_LOGIN são atributos. E esse conjunto de atributos forma um objeto.
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU:  {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },
    
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    
    MOVIMENTACAO: {
         DESCRICAO: '[data-test=descricao]',
         VALOR: '[data-test=valor]',
         INTERESSADO: '[data-test=envolvido]',
         CONTA: '[data-test=conta]',
         STATUS: '[data-test=status]',
         BTN_SALVAR: '.btn-primary'
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]` ,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`
    },

    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]` // Criando um elemento dinâmico
        //XP_SALDO_CONTA: "//td[contains(., 'Conta para alterar')]/../td[2]" // (parametro) => retorno
    },

    MESSAGE: '.toast-message'
}

export default locators;