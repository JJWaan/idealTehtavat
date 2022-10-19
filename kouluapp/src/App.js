
import './App.css';
import Koulu from './Koulu';
import { useReducer } from "react"
import { useEffect } from 'react';


let oppilas1 = { nimi: "Olli Oppilas" }

let oppilas2 = { nimi: "Mikko Mallikas" }
let oppilas3 = { nimi: "Kalle Kolmonen" }


let luokka1 = {
  nimi: "3A",
  opplaidenMäärä: 27,
  oppilaat: [oppilas1, oppilas3]
}

let luokka2 = {
  nimi: "2B",
  opplaidenMäärä: 24,
  oppilaat: [oppilas2]
}

let koulu_ = {
  oppilaidenMäärä: 100,
  nimi: "Kangasalan ala-aste",
  luokat: [luokka1, luokka2],
  tallennetaanko: false,
  tietoAlustettu: false
}

function reducer(state, action) {
  switch (action.type) {

    case 'KOULUN_NIMI_MUUTTUI':
      console.log("Reduceria kutsuttiin", action)
      console.log("koulun uusi nimi olisi", action.payload)
      return {...state, nimi: action.payload.nimi, tallennetaanko: true};
      
    case 'OPPILAAN_NIMI_MUUTTUI':
      console.log("Reduceria kutsuttiin", action)
      let nimi = action.payload.nimi
      let kouluKopio = {...state}
      kouluKopio.luokat[action.payload.luokanIndex].oppilaat[action.payload.oppilaanIndex].nimi = nimi
      kouluKopio.tallennetaanko=true
      return kouluKopio

    case 'PAIVITA_TALLENNUSTILA':
      return {...state, tallennetaanko: action.payload}

    case 'ALUSTA_DATA':
      return {...action.payload, tietoAlustettu: true}
    
    
      default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
};

function App() {
//kouludata(eli paikallinenMuuttuja) tulee tosta: "koulu" eli statesta
  const [koulu, dispatch] = useReducer(reducer, koulu_);

//näitä kutsutaan vasta renderöinnin (return) jälkeen
  useEffect(() => {
//asetetaan paikallinenMuuttuja avainpari-nimellä kouludata
    let kouludata = localStorage.getItem('kouludata');
//jos kouludata lyö tyhjää, asetetaan koko koulu_ kouludataan(paikalliseenMuuttujaan)
//dispatchin payload on se data
    if(kouludata == null ) {
      console.log("data luettiin vakiosta")
      localStorage.setItem('kouludata', JSON.stringify(koulu_));
      dispatch({ type: "ALUSTA_DATA", payload: koulu_ })
    }
//jos siellä local storagessa on jo jotain, lisätään
//(ja parsitaan samantien ettei tule reducerissa ongelmia)
    else {
      console.log("data luettiin local storagesta")
      dispatch({ type: "ALUSTA_DATA", payload: (JSON.parse(kouludata)) })
    }
// toi array on riippuvuuslista. sinne voi tallentaa tiloja
  }, []);

  useEffect(() => {
    if(koulu.tallennetaanko == true) {
      console.log("koulun nimi pitäis tallentaa")
      console.log("koulu:", koulu)
      localStorage.setItem('kouludata', JSON.stringify(koulu));
      dispatch({ type: "PAIVITA_TALLENNUSTILA", payload: false })
    }
  },[koulu.tallennetaanko]);

  return (
    <div>
      { koulu.tietoAlustettu &&
      <Koulu koulu={koulu} dispatch={dispatch} /> }
    </div>
  );
}

export default App;