import './App.css';
import { useReducer, useEffect } from "react"
import axios from 'axios' // (npm install axios)

function reducer(state, action) {

  switch (action.type) {
// K = Kategoria
// V = Vitsi
    case 'K_NOUTO_ALOITETTU':
      console.log("state: kategorioiden nouto aloitettu")
      return { ...state, noutoAloitettu: true}

    case 'K_NOUDETTU':
      console.log("state: kategoriat noudettu jsonista")
      return { ...state,
        kategoriat: action.payload,
        noutoAloitettu: false,
        noutoValmis: true }

    case 'V_NOUTO_ALOITETTU':
      console.log("state: vitsin nouto aloitettu")
      return { ...state,
        noutoAloitettu: true,
        noutoValmis: false }

    case 'V_NOUDETTU':
      console.log("state: vitsi noudettu")
      return { ...state,
        vitsi: action.payload,
        noutoAloitettu: false,
        noutoValmis: true }

    case 'NOUTO_EPÄONNISTUI':
      console.log("datan nouto epäonnistui")
      return { ...state,
        noutoEpäonnistui: true,
        noutoAloitettu:false,
        noutoValmis: false }

    default:
      throw new Error("Reducer action.type err");
  }
};

// m a i n:
function ChuckJokes() {
  const [appData, dispatch] = useReducer(reducer, { vitsi: [], kategoriat: [], noutoAloitettu: false, noutoEpäonnistui: false, noutoValmis: false });
// K = Kategoria
// V = Vitsi
  useEffect(() => {
    async function haeDataa() {
      try {
        dispatch({ type: 'K_NOUTO_ALOITETTU' })
        // haetaan api:sta kategoriat categories-muuttujalle
          let categories = await axios('https://api.chucknorris.io/jokes/categories');
        // saadut kategoriat lähetetään payloadina reducerille
        dispatch({ type: 'K_NOUDETTU', payload: categories.data })
          // console.log("full json noudettu:", categories)
          // console.log("noudettu categories:", categories.data) // (array)

        dispatch({ type: 'V_NOUTO_ALOITETTU' })
        // haetaan api:sta random vitsi joke-muuttujalle
          let joke = await axios('https://api.chucknorris.io/jokes/random');
        // vitsi itessään lähetään payloadina reducerille
        dispatch({ type: 'V_NOUDETTU', payload: joke.data.value })
          // console.log("noudettu vitsi json:", joke)
          // console.log("vitsi.data.value:", joke.data.value)
      }
      catch (error) {
        console.log("Los Proplemos:", error)
        dispatch({ type: 'NOUTO_EPÄONNISTUI' })
      }
    };

    haeDataa();

  }, []);

  return (
    <>
      <div className='outer-wrapper'>

        <div className='chuck-categories'>
          <h3>Chuck Categories:</h3>
          {appData.kategoriat.map(item => <p>{item}</p>)}
        </div>

        <div className='chuck-joke'>
          <h3>Chuck Joke:</h3>
          {appData.vitsi}
        </div>

      </div>

      <div className='ui-info-box'>
        {appData.noutoAloitettu && "UI notification: Nouto aloitettu" }
        {appData.noutoEpäonnistui && "UI notification: Nouto epäonnistui" }
        {appData.noutoValmis && "UI notification: Nouto on valmis" }
      </div>
    </>
  );
};

export default ChuckJokes;