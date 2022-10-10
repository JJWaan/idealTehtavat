// Tehtävä 2.9
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa taulukon
// objektit on järjestetty arvojen(values) mukaiseen järjestykseen.

const objektiJarjestaja = () => {
    const objs = [
        { "ma": 44 },
        { "ti": 66 },
        { "ke": 21 },
        { "pe": 100 },
        { "la": 22 }
    ];
    return objs.sort((a, b) => Object.values(a) - Object.values(b))
}

console.log(objektiJarjestaja());