import axios from "axios";
import React, { useReducer, useEffect } from "react";

import Tentti from './Tentti'

// tentit, kysymykset, vastaukset

let tentit = [
    {
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

let appiukko = {
    pekka: tentit,
    seivataan: false,
}

const reducer = (state, action) => {
  switch (action.type) {

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
    case 'ALUSTA_DATA':
      console.log("alustadata redu")
      return action.payload

    case 'PAIVITA_TALLENNUSTILA': {
        console.log("paivita tallennustila redu");
        return {...state, seivataan: action.payload}; }

    default:
      throw new Error('err', action.payload, state);
      }
};
// m a i n  c o m p o n e n t :
const MainContentWithServer = () => {
    const [tentti, dispatch] = useReducer(reducer, appiukko);

    useEffect(() => {
        const haetaanServulta = async() => {
            try {
                let jotain = await axios.get('http://localhost:8080/')
                dispatch({ type: 'ALUSTA_DATA', payload: jotain.data })
            }
            catch (error) { console.log("fuck", error); }
        }
        haetaanServulta();
    }, []);

      useEffect(() => {
        const tallennaServulle = async() => {
            try {
                await axios.post('http://localhost:8080/', tentti)
                dispatch({ type: "PAIVITA_TALLENNUSTILA", payload: false })
                console.log("state tallennetaan servulle")
            }
            catch (error) { console.log("vttu", error); }
        }
        if(tentti.seivataan === true) { tallennaServulle(); };
      }, [tentti.seivataan]);

    return (
        <div className="main-content">
            <Tentti
              tentti={tentti.pekka}
              dispatch={dispatch}
            />
        </div>
    );
};

export default MainContentWithServer;