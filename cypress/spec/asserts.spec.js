/// <reference types="cypress" />

it('Igualdade', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').to.be.equal(1);
    expect('a').not.to.be.equal('b');
});

it('Verdadeiro', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    //expect(true).to.be.false;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
});

it('Igualdade de objetos', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eql(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.eql({a: 1, b: 2})
    // .include serve para verificar se tem uma determinada propriedade. No caso foi solicitado para ver a: 1
    // Verifique que esse objeto possui incluido nele a propriedade a com o valor 1.
    expect(obj).include({a: 1})
    // expect(obj).include({c: 1})
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty
    expect({}).to.be.empty
});

it('Array', () => {
    const arr = [1, 2, 3]
    expect(arr).to.have.members([1, 2, 3])
    expect(arr).to.include.members([1, 3])
    expect(arr).to.not.be.empty
    expect({}).to.be.empty
    
});

it('Tipos', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('String')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
});

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('teste')
    
    // Utilizando REGEX
    expect(str).to.match(/String/)
    expect(str).to.match(/^String/)
    expect(str).to.match(/teste$/)
    expect(str).to.match(/.{15}/) // Validar a quantidade de caracteres da string
    expect(str).to.match(/\w+/) // Para inspecionar que contem apenas letras
    expect(str).to.match(/\D+/) // Para inspecionar que não contem números
    
});

it('Números', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3) // é acima de 3
    expect(number).to.be.below(7) // a baixo de 7
    expect(floatNumber).to.be.equal(5.2123) 
    expect(floatNumber).to.be.closeTo(5.2, 0.1) // próximo de 5.2 com precisão de 0.1

});