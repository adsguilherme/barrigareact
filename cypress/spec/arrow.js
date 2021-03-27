it('nada agora', () => {
    
    // function soma(a, b) {
    //     return a + b;
    // }

    // const soma = (a, b) => {
    //     return a + b;
    // }

    // const soma = (a, b) => a + b;
    
    // const soma = (a, b) => {
    //     return a + b;
    // };

    // const soma = (a) => a + a;
    
    const soma = () => 10 + 10;

    console.log(soma(1,4));
});

it('a function teste...', function () {
    console.log('Function', this)
});

it('an arrow teste...', () => {
    console.log('Arrow', this)
});