// Tehtävä 2.10
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa taulukon
// kentät on järjestetty päivien(avaimet) mukaiseen järjestykseen periaatteella
// ma&lt;ti&lt;ke&lt;to&lt;pe&lt;la&lt;su.

const sortObjs = () => {
const objs = [
    { "ma": 44 },
    { "pe": 100 },
    { "ke": 21 },
    { "ti": 66 },
    { "la": 22 }
];

return päivät.sort((a, b) => {
    return ( päiväjärjestys[Object.keys(a)[0]] - päiväjärjestys[Object.keys(b)[0]] );
  });
};

// objs.sort((a, b) => {
//     if (Object.keys(a)[0] > Object.keys(b)[0]) { return 1; }
//     return 0;
//     )}

