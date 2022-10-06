// Tehtävä 1.2
// Muuta tehtävää 1 siten, että se palauttaa ”syötit luvun joka on pienempi kuin 100”
// tapauksessa, jossa käyttäjä argumentin arvo on pienempi kuin sata.

let luku = 2;
function suurempiVaiPienempiKuin (luku) {
    return (luku <= 100 ? "syötit luvun, joka on pienempi kuin 100" : "");
};

console.log(suurempiVaiPienempiKuin(luku));