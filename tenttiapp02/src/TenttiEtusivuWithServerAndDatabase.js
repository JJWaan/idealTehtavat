// import dependencies
import React, { useReducer, useEffect } from "react";
import axios from "axios";

// import components
import NavbarLeft from "./NavbarLeft";
import LoadingScreen from "./LoadingScreen";
import Tentti from './Tentti';
import StatusbarRight from "./StatusbarRight";

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
const TenttiEtusivuWithServerAndDB = () => {
  const [tenttiState, dispatch] = useReducer(reducer, mainstate);
  console.log('alkuperäinen state (tenttiState):', tenttiState);
  useEffect(() => {
      const getDB = async() => {
          try {
              let dbData = await axios.get('https://localhost:4000/initial')
                console.log("get, tämä lähtee dispatchina dbData.data:", dbData.data);
              dispatch({
                type: 'INIT_DATA',
                payload: {
                  stateData: dbData.data,
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

  console.log('tenttiState vielä kerran ennen renderiä:', tenttiState);
  console.log(`<Tentti tentti={tenttiState.stateData} /> ,
    tenttiStaten stateData mitä tämä komponentti lähettää eteenpäin Tentti.js:lle propsina:`,
    tenttiState.stateData)

  return (
    <div className='main-grid-wrapper'>
      <NavbarLeft />
        {tenttiState.isInitialized === true ? <> <Tentti tentti={tenttiState.stateData} /> </> : <LoadingScreen />}
      <StatusbarRight />
    </div>
  );
};

export default TenttiEtusivuWithServerAndDB;

// arkkitehtuuri:
// index
// --> App
// --> TenttiEtusivuWithServerAndDatabase (tämä filu)
// --> Tentti
// ---> Kysymys