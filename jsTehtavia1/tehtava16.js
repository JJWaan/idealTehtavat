// Tehtävä 1.16
// Tee funktio, joka saa syötteenä painon (kg), pituuden (m) ja palauttaa painoindeksin.
// Painoindeksin avulla voidaan arvioida painoa. Painoindeksi (BMI = Body Mass Index)
// suhteuttaa painon ja pituuden, ja se voidaan laskea jakamalla paino pituuden neliöllä
// (laskukaavassa paino ilmaistaan kiloina, pituus metreinä).
// Aikuisilla painoindeksin normaalialue on 20.0-24.9. Joskus tästä painoindeksin
// normaalialueesta käytetään käsitettä &quot;ihannepaino&quot;. Mitä suurempi painoindeksi on, sitä
// suurempaan ylipainoon se viittaa

const paino = 75;
const pituus = 1.80;

const bmiLaskuri = (paino, pituus) => {
    const bmi = paino / pituus / pituus;
    return bmi
};

console.log(bmiLaskuri(paino, pituus));

// tässä seuraavassa on laskutoimitusvirhe:

// const paino = 75;
// const pituus = 1.80;
// const pituudenNelio = Math.sqrt(pituus);

// const bmiLaskuri = (paino, pituudenNelio) => {
//     const bmi = paino / pituudenNelio;
//     return bmi
// };

// console.log(bmiLaskuri(paino, pituudenNelio));