import React, { useReducer, useEffect } from "react";

import Tentti from './Tentti'

// tentit, kysymykset, vastaukset
let tentit = [
  {
    seivataan: false,
    tenttiItessaan: [
      { kysymys: "Mitä kuuluu?",
        oikeaVastaus: "Hyvää",
        vastausvaihtoehdot: [
          { vastaus: "Hyvää" },
          { vastaus: "Ihan OK" },
          { vastaus: "Huonoa" }
        ],
      },
      {
        kysymys: "1 + 1 = ?",
        oikeaVastaus: "2",
        vastausvaihtoehdot: [
          { vastaus: "1" },
          { vastaus: "2" },
          { vastaus: "3" }
        ], 
      },
      {
        kysymys: "Ruisleipä vai paahtoleipä",
        oikeaVastaus: "Ruisleipä",
        vastausvaihtoehdot: [
          { vastaus: "Piimälimppu" },
          { vastaus: "Paahtoleipä" },
          { vastaus: "Ruisleipä" }
        ],
      },
    ],
  },
  {
    seivataan: false,
    tenttiItessaan: [
      { kysymys: "Yhdyssana vai yhdys sana?",
        oikeaVastaus: "Yhdyssana",
        vastausvaihtoehdot: [
          { vastaus: "Yhdyssana" },
          { vastaus: "Sanayhdys" },
          { vastaus: "En tiijä" }
        ],
      },
      {
        kysymys: "100 + 1 = ?",
        oikeaVastaus: "101",
        vastausvaihtoehdot: [
          { vastaus: "-101" },
          { vastaus: "299" },
          { vastaus: "101" }
        ],
      },
      {
        kysymys: "Oletko oppinut jotain?",
        oikeaVastaus: "Kyllä",
        vastausvaihtoehdot: [
          { vastaus: "Kyllä" },
          { vastaus: "En" },
          { vastaus: "Hernekeitto" }
        ],
      },
    ],
  },
];

// console.log(tentit)
// Array [ {…}, {…} ]​
// 0: Object { tenttiItessaan: (3) […] }
// 1: Object { tenttiItessaan: (3) […] }
// length: 2


// --- --- --- //
// reducer
const reducer = (state, action) => {
  switch (action.type) {

  case 'KYSYMYS_MUUTETTU':
    console.log("KYSYMYS_MUUTETTU reducer")
    const kopio = [...state];
    console.log("state:", state)
    const { kysymys, index, tenttiIndex } = action.payload;
    console.log("KM payload:", action.payload);
    kopio[tenttiIndex].seivataan = true;
    kopio[tenttiIndex].tenttiItessaan[index].kysymys = kysymys;
    return kopio;

// case 'OIKEELLISUUS_MUUTETTU':
//   console.log("oikeellisuusmuutettu reducer")
//   const kopio__ = [...state];
//   const { index: index__, uusiOikea } = action.payload;
//   kopio[tentit].tenttiYksi[index].vastausvaihtoehdot[index].onkoOikea = uusiOikea;
//   return kopio;

// case 'VASTAUS_MUUTETTU':
//   console.log("VASTAUS_MUUTETTU reducer")
//   const kopio_ = [...state];
//   const { index: index_, uusiVastaus } = action.payload;
//   kopio_[tentit].tenttiYksi[index_].vastausvaihtoehdot[index_].vastaus = uusiVastaus;
//   return kopio_;

    // useEffectin asd
    case 'ALUSTA_DATA':
      console.log("alustadata redu")
      return action.payload

    case 'PAIVITA_TALLENNUSTILA':
      console.log("paivita tallennustila redu");
      return { ...state, seivataan: action.payload }

    default:
      throw new Error('err', action.payload, state);
      }
};

// m a i n  c o m p o n e n t :
const MainContent = () => {
    const [tentti, dispatch] = useReducer(reducer, tentit);

    //näitä kutsutaan vasta renderöinnin (return) jälkeen
  useEffect(() => {
    //asetetaan paikallinenMuuttuja avainpari-nimellä tenttidata
        let paikallinenMuuttuja = localStorage.getItem('tenttidata');
    //jos tenttidata lyö tyhjää, asetetaan koko tentit paikalliseenMuuttujaan
    //dispatchin payload on se data

        if(paikallinenMuuttuja == null ) {
          console.log("data luettiin muuttujasta")
          localStorage.setItem('tenttidata', JSON.stringify(tentit));
          dispatch({ type: "ALUSTA_DATA", payload: tentit })
        }
    //jos siellä local storagessa on jo jotain, lisätään
    //(ja parsitaan samantien ettei tule reducerissa ongelmia)
        else {
          console.log("data luettiin local storagesta")
          dispatch({ type: "ALUSTA_DATA", payload: (JSON.parse(paikallinenMuuttuja)) })
        }
    // toi array on riippuvuuslista. sinne voi tallentaa tiloja
    // eli jos ton listan sisällä oleva tila muuttuu -> react reagoi
    // ajamalla uudestaan useEffectin.
    // jos toi on tyhjä, ajetaan useEffect vain kerran
    // jos listaa ei ole, tulee todella helposti loputon looppi (?)
      }, []);

      useEffect(() => {
        if(tentit[0].seivataan == true) {
          console.log("tentin nimi pitäis tallentaa")
          console.log("tentit:", tentit)
          localStorage.setItem('tenttidata', JSON.stringify(tentit));
          dispatch({ type: "PAIVITA_TALLENNUSTILA", payload: false })
        }
      },[tentti[0].seivataan]);

    return (
        <div className="main-content">
            <Tentti
              tentti={tentti}
              dispatch={dispatch}
            />
        </div>
    );
};

export default MainContent;