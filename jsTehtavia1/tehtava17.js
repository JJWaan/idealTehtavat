// Tehtävä 1.17
// Kirjoita funktio, joka saa syötteenä vuosiluvun ja palauttaa merkkijonon “on” tai “ei” sen
// mukaan onko vuosi karkausvuosi.
// Karkausvuosia ovat pääsääntöisesti 4:llä jaolliset vuosiluvut.
// Vuosi ei kuitenkaan ole karkausvuosi, jos vuosiluku on jaollinen 100:lla.
// Mutta, jos vuosiluku on jaollinen 400:lla, vuosi on aina karkausvuosi.
// Ohje: Vuodet 1996 ja 2000 ovat karkausvuosia, vuodet 1800 ja 1997 eivät.

const vuosi = 1996;
let teksti = "";

function onkoKarkausvuosi(vuosi) {
    // ei jaollinen 400?
    if (vuosi % 100 == 0 && vuosi % 400 != 0) { teksti = "ei"; }
    // rajataan pois loput, jotka eivät ole jaollisia 4
    else if (vuosi % 4 != 0) { teksti = "ei"; }
    // jäljelle jää karkausvuodet
    else { teksti = "on"; }
    return teksti;
}

console.log(onkoKarkausvuosi(vuosi));