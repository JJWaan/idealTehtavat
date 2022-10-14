// Tehtävä 2.13
// Sinulla on {“ma”:44, “pe”:100, “ke”:21, “ti”: 66,”la”:22}. Tee ohjelma, joka muuttaa objektin
// listaksi niin, että [{“ma”:44},{“pe”:100},...]. Ohje: käytä esim. Objectin keys ja values -
// funktioita.

const objektistaTaulukko = () => {
    const päivät = {
      ma: 44,
      pe: 100,
      ke: 21,
      ti: 66,
      la: 22,
    };
  
    const arr = [];
  
    for (const [avain, arvo] of Object.entries(päivät)) {
      arr.push({ [avain]: arvo });
    }
  
    return arr;
};