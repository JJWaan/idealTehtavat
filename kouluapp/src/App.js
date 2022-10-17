import './App.css';
import React, { useState } from 'react';

import Koulu from './Koulu'

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

let koulu_ = {
  nimi: "Itäharjun ala-aste",
  oppilaidenMaara: 100,
  luokat: [luokka1, luokka2]
};

function App() {
  const [koulu, setKoulu] = useState(koulu_);

  const koulunNimiMuuttui = (nimi) => {
    const kouluKopio = JSON.parse(JSON.stringify(koulu))
    kouluKopio.nimi = nimi
    setKoulu(kouluKopio)
    console.log(kouluKopio)
  };

  const oppilaanNimiMuuttui = (nimi,oppilaanIndex,luokanIndex) => {
    const kouluKopio = JSON.parse(JSON.stringify(koulu))
    kouluKopio.luokat[luokanIndex].oppilaat[oppilaanIndex].nimi = nimi
    console.log("OK")  
    setKoulu(kouluKopio)
    console.log(kouluKopio)
  };

  return (
    <>
      <Koulu koulu = {koulu} oppilaanNimiMuuttui={oppilaanNimiMuuttui} koulunNimiMuuttui = {koulunNimiMuuttui}/> 
    </>
  )
};

export default App;
