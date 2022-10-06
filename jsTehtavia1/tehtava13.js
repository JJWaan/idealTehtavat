// Tehtävä 1.13
// Tee funktio, joka palauttaa parillisten kulujen summan lukuväliltä 0-1000.
// Tee tehtävä käyttäen joko for-rakennetta tai reduce-funktiota.

let sum = 0;

const parillistenSumma = (sum) => {
    for(let i = 0; i <= 1000; i++) { 
        if(i % 2 == 0) {sum = sum+=i}
    }
    return sum
};

console.log(parillistenSumma(sum));