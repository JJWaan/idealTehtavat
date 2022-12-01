import Kysymys from "./Kysymys";

// Tentti komponentti

const Tentti = ({ tentti, kaikkivastaukset, filtteroidytKysymykset }) => {
  // console.log("käytiin tentti.js:ssä, tentti-propsin sisältö:", tentti);

  // console.log("tentti:", tentti);
  // console.log("filt:", filtteroity);
  // console.log("kaikkivastaukset:", kaikkivastaukset);

  const cysymykset = filtteroidytKysymykset.map((item) => {
    return (
      <Kysymys
        key={item.kysymys_id}
        kysymys_id={item.kysymys_id}
        kysymys_teksti={item.kysymys_teksti}
        kysymys_pisteet={item.kysymys_pisteet}
        kaikkivastaukset={kaikkivastaukset}
      />
    );
  });

return (
      <div className="tentti">
        <span className="tentti-title">{tentti.tentti_nimi}</span>
        <span className="tentti-id">id: ({tentti.tentti_id})</span>
        <p className="tentti-desc">{tentti.tentti_kuvaus}</p>
          {cysymykset}
      </div>
  );
};

export default Tentti;