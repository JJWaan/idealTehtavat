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
      <Kysymys kaikkidata={tentti}/ >
  </div>
)});

// console.log('tässä kaikki:', kaikki);

return (
  <div className="tentti-container">
    {kaikkiTentit}
    {/* <Kysymys kaikkidata={tentti}/> */}
  </div>
  );
};

export default Tentti;