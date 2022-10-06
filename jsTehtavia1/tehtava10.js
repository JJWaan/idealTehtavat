// Tehtävä 1.10
// a) Tee funktio, joka palauttaa lukujen 7-131 summan.

let sum = 0;

const lukujenPalautus = (sum) => {
    for(let i = 7; i <= 131; i++) { sum = sum+=i }
    return sum
};

console.log(lukujenPalautus(sum));


// b) Tee funktio, joka saa syötteenä positiiviset luvut a ja b ja palauttaa lukuvälin summan.
// Huomaa, että ohjelman tulee tarkistaa, että b&gt;a.
// Tee molemmat tehtävät käyttäen sekä for-rakennetta että reduce-funktiota.

