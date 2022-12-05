// import dependencies
import React, { useReducer, useEffect } from "react";
import axios from "axios";

// import components
import LoadingScreen from "./LoadingScreen";
import Tentti from './Tentti';
import NavbarTop from "./NavbarTop";
import MainFooter from "./MainFooterElement";

// // //

// initial main state
let mainstate = {
  stateData: null,
  isInitialized: false,
  saving: false,
};

// 

// reducer, state management
const reducer = (state, action) => {
  switch (action.type) {
      // initialize state on first load (useEffect):
      case 'INIT_DATA':
        console.log("initialize app state, reducer, täällä payload dbData.data:sta tulee mainstate-objektin stateData !")
        return {
          ...state,
          stateData: action.payload.stateData,
          isInitialized: action.payload.initialized,
        }

    // ui input tilanhallinta
    // case 'KYSYMYS_MUUTETTU': {
    //   console.log("KYSYMYS_MUUTETTU reducer")
    //   const kopio = {...state};
    //   const { kysymys, index, tenttiIndex } = action.payload;
    //   kopio.pekka[tenttiIndex].tenttiItessaan[index].kysymys = kysymys;
    //   kopio.seivataan = true;
    //   return kopio; }

    // case 'VASTAUS_MUUTETTU': {
    //   console.log("VASTAUS_MUUTETTU reducer")
    //   const kopio = {...state};
    //   const { uusiVastaus, vastauksenIndex, kysymyksenIndex, tenttiIndex } = action.payload;
    //   kopio.pekka[tenttiIndex].tenttiItessaan[kysymyksenIndex].vastausvaihtoehdot[vastauksenIndex].vastaus = uusiVastaus;
    //   kopio.seivataan = true;
    //   return kopio; }

    // case 'PAIVITA_TALLENNUSTILA':
    //     console.log("paivita tallennustila redu");
    //     return {...state, seivataan: action.payload};

    default:
      throw new Error('threw new error:', action.payload, state);
  }
};

// main function, component
const TenttiEtusivuWithServerAndDB = ({ tokensetter }) => {
  const [tenttiState, dispatch] = useReducer(reducer, mainstate);
  console.log('alkuperäinen state (tenttiState):', tenttiState);
  useEffect(() => {
      const getDB = async() => {
          try {
              let getInitialDataFromDB = await axios.get('https://localhost:4000/initial')
                console.log("get, tämä lähtee dispatchina (getInitialDataFromDB.data):", getInitialDataFromDB.data);
              dispatch({
                type: 'INIT_DATA',
                payload: {
                  stateData: getInitialDataFromDB.data,
                  initialized: true
                }
              })
          }
          catch (error) { console.log('data initialization failed:', error) }
      };
      getDB();
  }, []);

    // useEffect(() => {
    //   const tallennaServulle = async() => {
    //       try {
    //           await axios.post('http://localhost:8080/', tentti)
    //           // tärkeää seuraavassa on flagin asettaminen falseksi
    //           dispatch({ type: "PAIVITA_TALLENNUSTILA", payload: false })
    //           console.log("state, (muutokset input kentässä) tallennetaan servulle")
    //       }
    //       catch (error) { console.log("prkl, update failed", error); }
    //   }
    //   // ehto. jos tätä ei ole tallennaServulle() ajetaan flagista riippumatta...
    //   if(tentti.seivataan === true) { tallennaServulle(); };
    // }, [tentti.seivataan]);

  // mapataan databasesta saadut kaikki tentit,
  // ja filteröidään sieltä kaikki kysymykset missä tentin id:t kohtaavat tauluissa.
  // palautetaan <Tentti /> komponentteja sen perusteella.
  const kaikkiTentit = tenttiState.stateData?.resTentti.map((item) => {
    const kysymyksienFilterointi = tenttiState.stateData.resLiitos.filter(liitositem => {
        if(liitositem.tentin_id === item.tentti_id) {
          return (liitositem.kysymyksen_id)
        };
    });
    return (
      <Tentti
        key={item.tentti_id}
        id={item.tentti_id}
        tentti={item}
        kaikkiliitos={tenttiState.stateData.resLiitos}
        kaikkivastaukset={tenttiState.stateData.resVastaus}
        filtteroidytKysymykset={kysymyksienFilterointi}
      />
    )});

  return (
    <div className='new-main-wrapper'>
      <NavbarTop tokensetter={tokensetter} tentit={tenttiState.stateData?.resTentti} />
      {tenttiState.isInitialized === true ? <div className="tenttien-container"> {kaikkiTentit} </div> : <LoadingScreen />}
      <MainFooter />
    </div>
  );
};

export default TenttiEtusivuWithServerAndDB;