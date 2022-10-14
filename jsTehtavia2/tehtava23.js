// Tehtävä 2.3
// Lisää ohjelmaan 2.2 minimin ja maksimin selvittävä osuus.
// a) for-rakenteen (forEach, for-silmukka tai for of) avulla
// b) reduce -funktiolla

const viikonpaivat = [
    { pva: "ma", tyotunnit: 24},
    { pva: "ti", tyotunnit: 8},
    { pva: "ke", tyotunnit: 10},
    { pva: "to", tyotunnit: 12},
    { pva: "pe", tyotunnit: 10},
    { pva: "la", tyotunnit: 4},
    { pva: "su", tyotunnit: 2},
];

for(let i = 0; i < viikonpaivat.length; i++) {
    if (i === 0) {
        max = viikonpaivat[i];
      }
      if (tuntilista[i] > max) {
        max = viikonpaivat[i];
      }
};