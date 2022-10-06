// Tehtävä 1.7
// Tee funktio, joka saa syötteenä etunimen, sukunimen ja iän. Funktio palauttaa
// merkkijonon muodossa ”Terve etunimi sukunimi, olet ikä vuotias”.

const etunimi = "Nalle";
const sukunimi = "Puh";
const ika = 123;

const tervehdys = (etunimi, sukunimi, ika) => {
    const moi = `Terve ${etunimi} ${sukunimi}, olet ${ika} vuotias.`
    return moi;
}

console.log(tervehdys(etunimi, sukunimi, ika));