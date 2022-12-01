import Vastaus from "./Vastaus";

// Kysymys komponentti

const Kysymys = ({ kysymys_id, kysymys_teksti, kysymys_pisteet, kaikkivastaukset }) => {

  const wastaukset = kaikkivastaukset.map((item) => {
    return (
      <Vastaus
        key={item.vastaus_id}
        vastaus_id={item.vastaus_id}
        vastaus_teksti={item.vastaus_teksti}
      />
    );
  });

  return (
      <div className="kysymys">
        <span className="kysymys-title">{kysymys_teksti} <span className="kysymys-id">id: ({kysymys_id})</span> </span>
          {wastaukset}
      </div>
  );
};

export default Kysymys;