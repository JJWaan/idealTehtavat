import React from "react";

// importataan kysymykset erillisestä tiedostosta
import kysymyksetvastaukset from "./KysymyksetVastaukset";

const Tentti = () => {
    return (
        <>
            <KysymyksetUI kys={kysymyksetvastaukset} />
        </>
    );
};

// komponentti mikä mappaa erillisen tiedoston kysymykset
// ja tulostaa ne (ul -> li)
const KysymyksetUI = (props) => {
    let importedKysymykset = props.kys.map( kysymyksetvastaukset =>
        <li key={kysymyksetvastaukset.id}>{kysymyksetvastaukset.kysymys}</li> );
    return (<ul>{importedKysymykset}</ul>)
};

export default Tentti;