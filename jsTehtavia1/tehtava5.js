// Tehtävä 1.5
// Tee funktio, jonka parametrit ovat viikonpäivän numeron ja joka palauttaa viikonpäivän,
// esim. jos argumentti on 1, palautetaan “maanantai”.

const viikonpva = (viikonpvaNumero) => {
    switch (viikonpvaNumero) {
        case 1: return "Ma"
        case 2: return "Ti"
        case 3: return "Ke"
        case 4: return "To"
        case 5: return "Pe"
        case 6: return "La"
        case 7: return "Su"
        default: console.log("Kaunis päivä tänään");
    }
};

console.log(viikonpva(123));