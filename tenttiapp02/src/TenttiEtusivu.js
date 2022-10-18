import React, { useReducer } from "react";

import Tentti from './Tentti'

// tentit, kysymykset, vastaukset
let tentit = [
    {
        tenttiYksi:
        {
            id: 1, kysymys: "Mitä kuuluu?", oikeaVastaus: "Hyvää",
            vastausvaihtoehdot: [
                { vastaus: "Hyvää" },
                { vastaus: "Ihan OK" },
                { vastaus: "Huonoa" }
            ],

            id: 2, kysymys: "1 + 1 = ?", oikeaVastaus: "2",
            vastausvaihtoehdot: [
                { vastaus: "1" },
                { vastaus: "2" },
                { vastaus: "3" }
            ],

            id: 3, kysymys: "Ruisleipä vai paahtoleipä", oikeaVastaus: "Ruisleipä",
            vastausvaihtoehdot: [
                { vastaus: "Piimälimppu" },
                { vastaus: "Paahtoleipä" },
                { vastaus: "Ruisleipä" }
            ],
        },
        
        tenttiKaksi: {
            id: 1, kysymys: "Yhdyssana vai yhdys sana?", oikeaVastaus: "Yhdyssana",
            vastausvaihtoehdot: [
                { vastaus: "Yhdyssana" },
                { vastaus: "Yhdys san a" },
                { vastaus: "En tiedä" }
            ],

            id: 2, kysymys: "100 + 1 = ?", oikeaVastaus: "101",
            vastausvaihtoehdot: [
                { vastaus: "10" },
                { vastaus: "200" },
                { vastaus: "101" }
            ],

            id: 3, kysymys: "Oletko oppinut jotain?", oikeaVastaus: "Kyllä",
            vastausvaihtoehdot: [
                { vastaus: "Kyllä" },
                { vastaus: "En" },
                { vastaus: "En osaa sanoa" }
            ]
        }
    },
];

// console.log(tentit)
// Array [ {…}, {…} ]

// reducer
const reducer = (state, action) => {
  switch (action.type) {

    // case 'KYSYMYS_MUUTETTU':
    //   console.log("KYSYMYS_MUUTETTU reducer")
    //   const kopio = [...state];
    //   const { index, kysymys } = action.payload;
    //   kopio[tentit].tentti[index].kysymys = kysymys;
    //   return kopio;

    case 'OIKEELLISUUS_MUUTETTU':
      console.log("oikeellisuusmuutettu reducer")
      const kopio = [...state];
      const { index: index, uusiOikea } = action.payload;
      kopio[tentit].tentti[index].vaihtoehdot[index].onkoOikea = uusiOikea;
      return kopio;

    case 'VASTAUS_MUUTETTU':
      console.log("VASTAUS_MUUTETTU reducer")
      const kopio_ = [...state];
      const { index: index_, uusiVastaus } = action.payload;
      kopio_[tentit].tentti[index].vaihtoehdot[index_].vastaus = uusiVastaus;
      return kopio_;

    default:
      throw new Error('err');
  }
};

// m a i n  c o m p o n e n t :
const MainContent = () => {
    const [tentti, dispatch] = useReducer(reducer, tentit);

    return (
        <div className="main-content">
            <Tentti tentti={tentti} dispatch={dispatch} />
        </div>
    );
};

export default MainContent;