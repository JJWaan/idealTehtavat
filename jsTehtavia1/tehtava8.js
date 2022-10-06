// Tehtävä 1.8
// Tee funktio, joka saa syötteenä syntymävuoden ja suosikkinumeron. Jos syntymävuosi on
// 1970 ja suosikkinumero 77, niin palautetaan teksti: ”Olet onnenpekka”. Tee tehtävä
// yhdellä JOS (IF) lauseella.

const svuosi = 1970;
const suosikkinumero = 77;

function onnea(svuosi, suosikkinumero) {
    if(svuosi == 1970 && suosikkinumero == 77) { console.log("Olet onnenpekka") }
    else { console.log("") }
};

onnea(svuosi, suosikkinumero);