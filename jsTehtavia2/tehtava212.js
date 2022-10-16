// Tehtävä 2.12
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa on
// mukana objektit, joiden avaimen toinen kirjain on e.

const eKirjain = () => {
    const objs = [{ ma: 44 }, { pe: 100 }, { ke: 21 }, { ti: 66 }, { la: 22 }];
    const arr = [];
  
    for (let i = 0; i < objs.length; i++) {
      if (Object.keys(päivät[i]).toString()[1] === 'e') {
        arr.push(objs[i]);
      }
    }
    return arr;
};