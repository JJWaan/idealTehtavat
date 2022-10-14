// Tehtävä 2.4
// Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden palkkatulot kuukausittain.
// Kuukausipalkkaa korotetaan 50 %:lla. Ohjelma luo uuden taulukon, josta löytyvät korotetut
// palkat.

const vuodenPalkka = (...vuodenPalkat) => {
    return vuodenPalkat.map((kk) => {
      return kk * 1.5;
    });
  };
