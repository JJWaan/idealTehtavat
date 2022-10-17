import React, { useState } from "react";

// importataan kysymykset erillisestä tiedostosta
// import kysymyksetvastaukset from "./KysymyksetVastaukset";

// kysymykset, vastaukset
let kysymyksetvastaukset = [
    { id: 1, kysymys: "Mitä kuuluu?", vastaus: "Hyvää" },
    { id: 2, kysymys: "1+1 = ?", vastaus: 2 },
    { id: 3, kysymys: "Oletko oppinut jotain?", vastaus: "Kyllä" },
    { id: 4, kysymys: "Testi", vastaus: [vastausyksi, vastauskaksi] }
];

let tenttiyksi = { tenttiNimi: "tentti 1", tenttiKysymykset: [kysymysyksi, kysymyskaksi]};
let tenttikaksi = { tenttiNimi: "tentti 1", tenttiKysymykset: [kysymysyksi, kysymyskaksi]};
let vastausyksi = { vastaus: "vastaus yksi"};
let vastauskaksi = { vastaus: "vastaus kaksi"};

const Tentti = () => {
    const [vastaus, setVastaus] = useState("moi")

    // user input
    const Vastauskentta = () => {
    return (
        <input type="text"
            value={vastaus}
            onChange={(event) => {inputtiaKirjoitettu(event.target.value)}}/> )
    };

    const Vastauskentta2 = () => {
    return (
        <input type="text"
            onChange={(event)=>{vastausMuuttui(event.target.value)}}
            value = {kysymyksetvastaukset.kysymys} />
        )
    };

    // mapataan kysymykset
    const Kysymykset2UI = (props) => {
    let kyssarit = props.kys.map( kysymyksetvastaukset =>
        <p key={kysymyksetvastaukset.id}> {kysymyksetvastaukset.kysymys} </p> );
    return (<div>{kyssarit}</div>)
    };

    // kopioidaan kaikki data
    const vastausMuuttui = (vastaus) => {
        const vastausKopio = JSON.parse(JSON.stringify(kysymyksetvastaukset))
        vastausKopio = vastaus // ??
        setVastaus(vastausKopio)
        console.log("muutos")
    };

    const inputtiaKirjoitettu = () => {
        return setVastaus(vastaus)
    };
    
    return (
        <>
            <Kysymykset2UI kys={kysymyksetvastaukset} />

            <Vastauskentta vastaus={vastaus}
                vastausMuuttui={vastausMuuttui} />

            <Vastauskentta2 vastaus={vastaus}
                vastausMuuttui={vastausMuuttui} />
        </>
    );
};

export default Tentti;

// const [koulu, setKoulu] = useState(koulu_);

//   // brute force, kopsaa kaiken tiedon:
//   const koulunNimiMuuttui = (nimi) => {
//     const kouluKopio = JSON.parse(JSON.stringify(koulu))
//     kouluKopio.nimi = nimi
//     setKoulu(kouluKopio)
//     console.log(kouluKopio)
//   };

//   const oppilaanNimiMuuttui = (nimi,oppilaanIndex,luokanIndex) => {
//     const kouluKopio = JSON.parse(JSON.stringify(koulu))
//     kouluKopio.luokat[luokanIndex].oppilaat[oppilaanIndex].nimi = nimi
//     console.log("OK")  
//     setKoulu(kouluKopio)
//     console.log(kouluKopio)
//   };

//   return (
//     <>
//       <Koulu koulu = {koulu} oppilaanNimiMuuttui={oppilaanNimiMuuttui} koulunNimiMuuttui = {koulunNimiMuuttui}/> 
//     </>
//   )
// };

    // komponentti mikä mappaa erillisen tiedoston kysymykset ja tulostaa ne
    // const KysymyksetUI = (props) => {
    //     let importedKysymykset = props.kys.map( kysymyksetvastaukset =>
    //         <p key={kysymyksetvastaukset.id}> {kysymyksetvastaukset.kysymys} </p> );
    //     console.log(importedKysymykset)
    //     return {importedKysymykset}
    // };