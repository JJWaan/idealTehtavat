import React from 'react';
import './App.css';

const Oppilas = (props) => {
  return (
    <div>
      <div>{props.oppilas.nimi}
       <input type="text" onChange={(event)=>
        {props.dispatch({type:"OPPILAAN_NIMI_MUUTTUI",
        payload:
          {
          nimi:event.target.value,
          oppilaanIndex:props.index,
          luokanIndex:props.luokanIndex}
          })}}  value = {props.oppilas.nimi}/>
  
      </div>
      <div>{props.tieto2}
      </div>
    </div>
  );
}

export default Oppilas;