// Tehtävä 1.3
// Muuta tehtävää 2 siten, että funktio palauttaa tekstin ”luku on 100” jos käyttäjä syöttää
// luvun 100.

let luku = 100;
onkoSata = (luku) => { return (luku === 100 ? "luku on 100" : ""); };

console.log(onkoSata(luku));