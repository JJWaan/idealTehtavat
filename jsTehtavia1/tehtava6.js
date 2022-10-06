// Tehtävä 1.6
// Tee funktio, joka saa syötteenä iän ja palauttaa seuraavat tekstit riippuen iästä:

// 1-17 “olet alaikäinen”
// 18-33 “olet nuori”
// 34-50 “olet keski-ikäinen”
// 51- “olet vanha”

const ika = -100;
let teksti = "";

const ikaTarkastaja = (ika) => {
    if ( ika >= 1 && ika <= 17 ) { teksti = "olet alaikäinen"; }
    else if ( ika >= 18 && ika <= 33 ) { teksti = "olet nuori"; }
    else if ( ika >= 34 && ika <= 50 ) { teksti = "olet keski-ikäinen"; }
    else if ( ika >= 51 ) { teksti = "olet wanha"; }
    else { teksti = "olet jotain ihan muuta"; }
    return teksti;
};

console.log(ikaTarkastaja(ika));