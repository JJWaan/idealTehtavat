import React from "react";

const Koulu = (props) => {
    return (
        <>
            <div>Koulun nimi: {props.luokka.nimi}</div>
            <input type="text"
                onChange={(event)=>{props.koulunNimiMuuttui}}
                value={props.koulu.nimi}></input>

            <div>
                Luokat:
            </div>
        </>
    )
};

export default Koulu;