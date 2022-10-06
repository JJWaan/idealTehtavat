// Tehtävä 1.18
// Tee funktio, joka saa syötteenä luvun. Mikäli syöte ei ole 1 funktio palauttaa ” Syöte ei ole
// 1” .

const luku = 2;

const funktio = (luku) => {
    (luku != 1 ? txt = "Syöte ei ole 1" : txt = null)
    return txt;
};

console.log(funktio(luku));