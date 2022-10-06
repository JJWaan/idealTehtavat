// Tehtävä 1.4
// a) Tee funktio, jonka parametreina ovat tunnit, minuutit ja sekunnit ja se palauttaa
// kokonaisajan sekunteina. Esimerkiksi, jos argumenteiksi annetaan 0 tunneiksi, 1
// minuuteiksi 1 ja 1 sekunneiksi, palauttaa funktio 61 sekuntia.

//user input:
let sekunnit = 2;
let minuutit = 1;
let tunnit = 0;

//konvertteri:
function kokonaisaika(sekunnit, minuutit, tunnit) {
    const s = 1;
    const m = 60;
    const h = 3600;
    sekunnit = sekunnit * s;
    minuutit = minuutit * m;
    tunnit = tunnit * h;

    let aikaSekunteina = sekunnit + minuutit + tunnit;
    return aikaSekunteina;
};

//output:
console.log("Aika sekunteina on: " + kokonaisaika(sekunnit, minuutit, tunnit));
// odotettu tulos: 62.

// Kokeile ohjelmaasi myös seuraavalla syötteellä: tunnit=20, minuutit=2 ja sekunnit=300.
// Jos ohjelmasi ei toimi, korjaa se.

// tulos: 72420 sekuntia.
// -----

// b) Tee funktio, jonka parametrina on valuutan määrä markoissa ja se palauttaa määrän
// euroissa.

const kurssi = 6;
const maara = 60;

markatEuroiksi = (kurssi, maara) => { return maara / kurssi };

console.log(maara + " markkaa on " + markatEuroiksi(kurssi, maara) + " euroina");

// c) Tee funktio, jonka parametrina on valuutan määrä euroissa ja se palauttaa määrän
// markoissa.

const maara2 = 1;

eurotMarkoiksi = (kurssi, maara2) => { return maara2 * kurssi };

console.log(maara2 + " euroa on " + eurotMarkoiksi(kurssi, maara2) + " markkoina");