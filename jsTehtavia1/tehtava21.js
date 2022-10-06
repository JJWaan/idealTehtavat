// Tehtävä 1.21
// Laadi funktio, joka saa syötteenä henkilön nimen.. Jos nimi on Pekka, palautetaan
// funktiosta ”Minunkin mielestäni Pekka on kiva”. Sama logiikka pätee, jos syötteenä on
// Liisa tai Jorma. Jos syötetään jotain muuta, palautetaan funktiosta ”En tunne henkilöä”.
// Toteuta ohjelma sekä ehtolausein että switch-case rakenteen avulla.

const nimi = "Jarkko";
let teksti = "";

const funktio = (nimi) => {
    if(nimi === "Pekka" || nimi === "Liisa" || nimi === "Jorma") {
        teksti = `Minunkin mielestäni ${nimi} on kiva`; }
    else { teksti = "En tunne henkilöä"; }
    return teksti;
};

console.log(funktio(nimi));