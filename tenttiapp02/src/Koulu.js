import './App.css';
import Luokka from './Luokka'

const Koulu = (props) => {
  return (
    <>
      <h4>Koulun nimi: {props.koulu.nimi} </h4>
{/*       <input type="text" onChange={(event)=>{ props.koulunNimiMuuttui(event.target.value) }}  value = {props.koulu.nimi}/>
 */}
       <input type="text" onChange={(event)=> {
            props.dispatch({ type: "KOULUN_NIMI_MUUTTUI",
            payload: event.target.value })
        }}
            value = {props.koulu.nimi} />

      <p style={{color: "red"}}>Luokat:</p>

        <div>
            {props.koulu.luokat.map((luokka,index) =>
            <Luokka
                dispatch={props.dispatch}
                luokanIndex ={index}
                luokka={luokka}
                key={index}/>
                )}
        </div>
    </>
  );
}

export default Koulu;