// Tehtävä 2.5
// Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden bruttopalkat kuukausittain ja
// veroprosentti. Ohjelma luo uuden taulukon ja laskee nettotulot vähentäen jokaisen
// kuukauden bruttopalkasta verot.

const palkat = [
  {"tammi": 1000},
  {"helmi": 1000},
  {"maalis": 1000},
  {"huhti": 1000},
  {"touko": 1000},
  {"kesa": 1000},
  {"heina": 1000},
  {"elo": 1000},
  {"syys": 1000},
  {"loka": 1000},
  {"marras": 1000},
  {"joulu": 1000}
];

const vPros = 20;

const vuodenPalkkaVeroilla = (palkat, vPros) => {
    return palkat.map((kk) => kk - kk * (vPros * 0.01));
  };  