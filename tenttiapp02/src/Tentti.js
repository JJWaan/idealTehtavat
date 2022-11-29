import Kysymys from "./Kysymys";

// Tentti komponentti

const Tentti = ({ tentti }) => {
console.log("käytiin tentti.js:ssä, tentti-propsin sisältö:", tentti);

const kaikkiTentit = tentti.resTentti.map((item, i) => { return (
  <div
    key={i}
    className="tentti">
      <span className="tentti-title">{item.tentti_nimi}</span>
      <span className="tentti-id">id: ({item.tentti_id})</span>
      <p className="tentti-desc">{item.tentti_kuvaus}</p>

      <Kysymys kaikkidata={tentti} />
  </div>
)});

// const tenttienIDt = tentti.resTentti.map((item) => { return (item.tentti_id) });
// const kysymyksienIDt = tentti.resKysymys.map((item) => { return (item.kysymys_id) });
// const kaikkiLiitosK = tentti.resLiitos.map((item) => { return (item.kysymyksen_id) });
// const kaikkiLiitosT = tentti.resLiitos.map((item) => { return (item.tentin_id) });

// console.log("tentti_iideet:", tenttienIDt);
// console.log("kysymys_iideet:", kysymyksienIDt);
// console.log("liitos_tenttien_iideet:", kaikkiLiitosT);
// console.log("liitos_kysymyksen_iideet:", kaikkiLiitosK);

// const jeesus = [tenttienIDt, kysymyksienIDt, kaikkiLiitosT, kaikkiLiitosK];

// console.log("jeesus:", jeesus);

// let valitutPalat = [];

// const checkkaaKysymysID = (tenttienIDt, kysymyksienIDt, kaikkiLiitosK, kaikkiLiitosT) => {
// kysymyksienIDt === kaikkiLiitosK && tenttienIDt === kaikkiLiitosT ? console.log("jee!") : console.log("voiei!")
  // for (let i = 0; i < kysymyksienIDt.length; i++) {
  //   if(kysymyksienIDt[i]) {
  //     valitutPalat.push[i];
  //   }
  // }
  // valitutPalat.push()
  // return valitutPalat
  // else { return <p>olet paholaisen pikku huora</p> }
// };

// checkkaaKysymysID();
// console.log("the chosen ones:", valitutPalat)

// let saatana = jeesus.filter(checkkaaKysymysID)

// console.log("saatana:", saatana);

return (
  <div className="tentti-container">
    {/* placeholder */}
    {kaikkiTentit}
    {/* <Kysymys kaikkidata={tentti}/> */}
  </div>
  );
};

export default Tentti;