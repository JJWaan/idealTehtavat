// Vastaus komponentti

const Vastaus = ({ vastaus_id, vastaus_teksti }) => {
  
    return (
        <div className="vaihtoehto">
          <span className="vastaus-teksti">{vastaus_teksti}</span>
          <span className="vastaus-id">id: ({vastaus_id})</span>
        </div>
      );
  };
  
  export default Vastaus;