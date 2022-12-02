import Vastaus from "./Vastaus";

// Kysymys komponentti

const Kysymys = ({ kysymys_id, kysymys_teksti, kysymys_pisteet, kaikkivastaukset }) => {

  const vastauksienFilterointi = kaikkivastaukset.filter(filteritem => {
    if(kysymys_id === filteritem.kysymyksen_id) {
      return (filteritem)
    };
  });
  const mapatutFilterit = vastauksienFilterointi.map(item => {
    return (
      <Vastaus
        key={item.vastaus_id}
        vastaus_id={item.vastaus_id}
        vastaus_teksti={item.vastaus_teksti}
      />
    );
  })

  return (
    <div className="kysymys">
      <span className="kysymys-title">{kysymys_teksti} <span className="kysymys-id">id: ({kysymys_id})</span> </span>
        {mapatutFilterit}
    </div>
  );
};

export default Kysymys;