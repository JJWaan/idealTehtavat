import './App.css';

import Luokka from './Luokka';
import Oppilas from './Oppilas';

const Sovellus = () => {

  let oppilas1 = {nimi:"Olli Oppilas"}
  let oppilas2 = {nimi:"Mikko Mallikas"}
  let oppilas3 = {nimi:"Kalle Kolmonen"}

  let luokka1 = {
    nimi: "3A",
    opplaidenMäärä: 27,
    oppilaat: [oppilas1, oppilas3]
  };

  let luokka2 = {
    nimi: "2B",
    oppilaidenMaara: 24,
    oppilaat: [oppilas2]
  };

  let koulu = {
    nimi: "Itäharjun ala-aste",
    oppilaidenMaara: 100,
    luokat: [luokka1, luokka2]
  };

  return (
    <div className="App">
        <p>moi</p> <br /> <br />

        <div>
          <p>Koulun nimi: {koulu.nimi}</p>
          <p>Oppilaita koulussa: {koulu.oppilaidenMaara}</p>
        </div>
        <br />

        <div>
          {koulu.luokat.map( luokka => <Luokka luokka={luokka} /> )}
        </div>

    </div>
  )
};

export default Sovellus;
