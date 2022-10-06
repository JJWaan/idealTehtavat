// Tehtävä 1.9
// Tee funktio, joka palauttaa luvut 7-131 (lista/taulukko)

let lista = [];

const lukujenPalautus = (lista) => {
    for(let i = 7; i <= 131; i++) { lista.push(i) }
    return lista;
};

console.log(lukujenPalautus(lista));