import './App.css';
import Koulu from './Koulu';
import { useReducer } from "react"

let oppilas1 = { nimi: "Olli Oppilas", id: 0 }
let oppilas2 = { nimi: "Mikko Mallikas", id: 1 }
let oppilas3 = { nimi: "Kalle Kolmonen", id: 2 }


let luokka1 = {
    id: 10,
    nimi: "3A",
    oppilaidenMäärä: 27,
    oppilaat: [oppilas1, oppilas3]
}

let luokka2 = {
    id: 20,
  nimi: "2B",
  oppilaidenMäärä: 24,
  oppilaat: [oppilas2]
}

let koulu_ = {
    id: 100,
  oppilaidenMäärä: 1000,
  nimi: "Kangasalan ala-aste",
  luokat: [luokka1, luokka2]
}

// reducer
function reducer(state, action) {
  switch (action.type) {

    case 'KOULUN_NIMI_MUUTTUI':
      console.log("Reducer koulun nimi", action)
      return {...state, nimi: action.payload.nimi};
      
    case 'OPPILAAN_NIMI_MUUTTUI':
      console.log("Reducer oppilaan nimi", action)
      let nimi = action.payload.nimi
      let kouluKopio = {...state}
      kouluKopio.luokat[action.payload.luokanIndex].oppilaat[action.payload.oppilaanIndex].nimi = nimi      
      return kouluKopio

      default:
      throw new Error("reduceriin tultiin jännällä actionilla");
  }
};

function Applikaatio() {
//asetetaan reducer
  const [koulu, dispatch] = useReducer(reducer, koulu_);
//dispatch = reducer
  return (
    <div>
      <Koulu koulu={koulu} dispatch={dispatch} />
    </div>
  )
};

export default Applikaatio;