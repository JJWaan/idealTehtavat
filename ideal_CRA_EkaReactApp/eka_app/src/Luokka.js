import Oppilas from "./Oppilas";

const Luokka = ( props ) => {
    return (
        <>
            <h2>Luokan nimi: {props.luokka.nimi}</h2>

            <div>
                Oppilaat: 
                {props.luokka.oppilaat.map(oppilas => <Oppilas oppilas = {oppilas} />)}
            </div>
        </>
    )
};

export default Luokka;