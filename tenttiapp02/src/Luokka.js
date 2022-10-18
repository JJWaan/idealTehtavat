import './App.css';
import Oppilas from './Oppilas';

const Luokka = (props) => {
  return (
    <>
      <p style={{color: "green"}}> {props.luokka.nimi} </p>
       <h5>Oppilaat:</h5>

       <div>{props.luokka.oppilaat.map((oppilas,index) =>
        <Oppilas 
            dispatch={props.dispatch}
            index={index}
            luokanIndex={props.luokanIndex}
            oppilas={oppilas}
            key={index} />)}
        </div> 
     </>
  )
};

export default Luokka;