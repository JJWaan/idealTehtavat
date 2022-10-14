// Tehtävä 2.5
// Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden bruttopalkat kuukausittain ja
// veroprosentti. Ohjelma luo uuden taulukon ja laskee nettotulot vähentäen jokaisen
// kuukauden bruttopalkasta verot.

const vuodenPalkkaVeroilla = (palkka, veroprosentti) => {
    return palkka.map((kk) => kk - kk * (veroprosentti * 0.01));
  };  