// Tehtävä 1.12
// Tee funktio, joka palauttaa parilliset luvut väliltä 0-100.
// Tee tehtävä käyttäen for-rakennetta tai reduce-funktiota.

const lista = [];

const parilliset = (lista) => {
    for(let i = 0; i<100; i++) {
        if(i % 2 == 0) { lista.push(i) }
    }
    return lista
};

console.log(parilliset(lista));