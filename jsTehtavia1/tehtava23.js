// Tehtävä 1.23
// Rakennusfirma aikoo tilata 50 kpl erikokoisia betonielementtejä monumentin pystytystä
// varten. Arkkitehdin oikkujen mukaan tilattavien elementtien on oltava eri kokoisia.
// Elementit ovat sellaisia, että pienin elementti on kooltaan
// 0,3 m x 0,5 m x 0,5 m (pituus, leveys, korkeus).
// Seuraava elementti on aina 2% pidempi, 3% leveämpi ja 1.5%
// korkeampi kuin edellinen elementti.
// Betonielementtejä kuljetetaan rakennuspaikalle kuorma-autolla.
// Kuorma-auto voi kuljettaa enintään 10500 kg kuormaa.
// Kun tiedetään, että betonin tiheys on 2,5 kg/dm 3 ,
// kuinka monta kertaa kuorma-auto joutuu ajamaan rakennuspaikalle.
// Ratkaise ongelma laatimasi funktion/ohjelman avulla. Ohjelmassa ei saa käyttää valmiita
// potenssiinkorotusfunktioita.

function ajokerrat() {
    let pituus = 0.3;
    let leveys = 0.5;
    let korkeus = 0.5;
    let reissujenMaara = 0;
    let kokonaispaino = 0;

    for(i = 0; i < 50; i++) {
        const kuutioDm = (10 * pituus) * (10 * leveys) * (10 * korkeus);
        const paino = 2.5 * kuutioDm;
        if(kokonaispaino + paino <= 10500) { kokonaispaino += paino }
        else {
            reissujenMaara++;
            kokonaispaino = 0;
            kokonaispaino += paino }
        pituus *= 1.02;
        leveys *= 1.03;
        korkeus *= 1.015;

        if(i===49 && reissujenMaara === 0) { reissujenMaara = 1 }
    }
    return reissujenMaara;
};

console.log("reissuja tulee: " + ajokerrat());