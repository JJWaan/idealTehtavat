import axios from "axios";
import React, { useReducer, useEffect } from "react";

import Tentti from './Tentti'

// main state
let appiukko = {
  pekka: null,
  seivataan: false,
  onkoAlustettu: false
}

// 

// reducer, tilanhallinta
const reducer = (state, action) => {
  switch (action.type) {
    // ui input tilanhallinta
    case 'KYSYMYS_MUUTETTU': {
      console.log("KYSYMYS_MUUTETTU reducer")
      const kopio = {...state};
      const { kysymys, index, tenttiIndex } = action.payload;
      kopio.pekka[tenttiIndex].tenttiItessaan[index].kysymys = kysymys;
      kopio.seivataan = true;
      return kopio; }

    case 'VASTAUS_MUUTETTU': {
      console.log("VASTAUS_MUUTETTU reducer")
      const kopio = {...state};
      const { uusiVastaus, vastauksenIndex, kysymyksenIndex, tenttiIndex } = action.payload;
      kopio.pekka[tenttiIndex].tenttiItessaan[kysymyksenIndex].vastausvaihtoehdot[vastauksenIndex].vastaus = uusiVastaus;
      kopio.seivataan = true;
      return kopio; }

    // useEffectin redut
      // initialize state
    case 'ALUSTA_DATA':
      console.log("initialize app state, reducer")
      return { ...state,
        pekka: action.payload.pekka,
        onkoAlustettu: action.payload.alustettu,
        seivataan: false }

    case 'PAIVITA_TALLENNUSTILA':
        console.log("paivita tallennustila redu");
        return {...state, seivataan: action.payload};

    default:
      throw new Error('err', action.payload, state);
  }
};

// m a i n  c o m p o n e n t :
const MainContentWithServer = () => {
  const [tentti, dispatch] = useReducer(reducer, appiukko);
  // console.log("mis mennää, state nyt:", tentti);
  useEffect(() => {
      const haetaanServulta = async() => {
          try {
              let servunData = await axios.get('http://localhost:8080/')
              // console.log("state, servunData:", servunData);
              // console.log("state, servunData.data:", servunData.data);
              dispatch({ type: 'ALUSTA_DATA',
                payload: { pekka: servunData.data.pekka, alustettu: true } })
          }
          catch (error) { console.log("damnit, init fail:", error); }
      }
      haetaanServulta();
  }, []);

    useEffect(() => {
      const tallennaServulle = async() => {
          try {
              await axios.post('http://localhost:8080/', tentti)
              // tärkeää seuraavassa on flagin asettaminen falseksi
              dispatch({ type: "PAIVITA_TALLENNUSTILA", payload: false })
              console.log("state, (muutokset input kentässä) tallennetaan servulle")
          }
          catch (error) { console.log("prkl, update failed", error); }
      }
      // ehto. jos tätä ei ole tallennaServulle() ajetaan flagista riippumatta...
      if(tentti.seivataan === true) { tallennaServulle(); };
    }, [tentti.seivataan]);

  const LoadingScreen = () => {
    console.log("käytiin loading screenissä")
    return <div>morjesta</div>
  };

  return (
    <>
      <div className="main-content">
        {tentti.onkoAlustettu === true ?
          <Tentti tentti={tentti.pekka} dispatch={dispatch} /> : <LoadingScreen />}
      </div>
    </>
  );
};

export default MainContentWithServer;