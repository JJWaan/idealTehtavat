// Tehtävä 2.11
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}].
// Luo taulukko, jossa on mukana objektit, joissa on parillinen arvo.

const objs = [
    { "ma": 44 },
    { "ti": 66 },
    { "ke": 21 },
    { "pe": 100 },
    { "la": 22 }
];

const funktio = (objs) => {
    let uusiLista = [];
    objs.reduce((acc, arvo) => {
        if(Object.values(arvo) % 2 === 0) { uusiLista.push(arvo) }
        else { return acc }
    }, objs[0]);
    return uusiLista;
};

console.log(funktio(objs));