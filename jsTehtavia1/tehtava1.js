// Tehtävä 1.1
// Tee funktio, joka saa parametrina kokonaisluvun. Jos luku on suurempi kuin 100, funktio
// palauttaa: ”syötit luvun, joka on suurempi kuin 100”. Jos luku on 100 tai pienempi,
// palautetaan “”

let luku = 999;
function suurempiVaiPienempiKuin (luku) {
    return (luku >= 100 ? "syötit luvun, joka on suurempi kuin 100" : "");
};

console.log(suurempiVaiPienempiKuin(luku));