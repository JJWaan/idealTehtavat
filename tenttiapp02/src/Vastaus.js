// Vastaus komponentti

const Vastaus = ( {kaikkidataTaas} ) => {
    console.log("käytiin Vastaus.js:ssä, kaikkidataTaas sisältö:", kaikkidataTaas);
  
    const kaikkiVas = kaikkidataTaas.resVastaus.map((item, i) => { return (
      <div key={i} className="vaihtoehto">
        <span className="vastaus-teksti">{item.vastaus_teksti}</span>
        <span className="vastaus-id">id: ({item.vastaus_id})</span>
        {/* <p className="p-desc">kysymyksen pisteet: {item.vastaus_pisteet}</p> */}
      </div>
    )});
  
  
    return (
      <div className="vastaukset">
        {kaikkiVas}
      </div>
      );
  };
  
  export default Vastaus;