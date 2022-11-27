import Vastaus from "./Vastaus";

// Kysymys komponentti

const Kysymys = ( {kaikkidata} ) => {
  console.log("käytiin Kysymys.js:ssä, kaikkidata sisältö:", kaikkidata);

  const kaikkiKys = kaikkidata.resKysymys.map((item, i) => { return (
    <div key={i} className="kysymys">
      <span className="kysymys-title">{item.kysymys_teksti}</span>
      <span className="kysymys-id">id: ({item.kysymys_id})</span>
      {/* <p className="p-desc">kysymyksen pisteet: {item.kysymys_pisteet}</p> */}
      <Vastaus kaikkidataTaas={kaikkidata} />
    </div>
  )});


  return (
    <div className="kysymykset">
        {kaikkiKys}
    </div>
    );
};

export default Kysymys;