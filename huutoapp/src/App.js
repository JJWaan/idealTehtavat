import './App.css';
import { useReducer, useEffect } from "react"
import axios from 'axios' // (npm i axios)

// reducer, cases
function reducer(state, action) {
  switch (action.type) {
// K = Kategoria
// V = Vitsi

    // K:
    case 'K_NOUTO_ALOITETTU':
      console.log("state: kategorioiden nouto aloitettu")
      return { ...state,
        noutoAloitettu: true,
        noutoValmis: false }

    case 'K_NOUDETTU':
      console.log("state: kategoriat noudettu jsonista")
      return { ...state,
        kategoriat: action.payload,
        noutoAloitettu: false,
        noutoValmis: true }

    // V:
    case 'V_NOUTO_ALOITETTU':
      console.log("state: vitsin nouto aloitettu")
      return { ...state,
        noutoAloitettu: true,
        noutoValmis: false }

    case 'V_NOUDETTU':
      console.log("state: vitsi noudettu jsonista")
      return { ...state,
        // vitsi: action.payload,
        vitsiObjekti: action.payload,
        noutoAloitettu: false,
        noutoValmis: true }

    case 'AUTOFETCH':
      console.log("state: autofetching")
      return { ...state,
        // noutoAloitettu: true,
        timeri: action.payload,
        auto5: true }

    case 'NOUTO_EPÄONNISTUI':
      console.log("datan nouto epäonnistui", action.type)
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
  const [appData, dispatch] = useReducer(reducer, { 
    vitsi: [], vitsiObjekti: {}, kategoriat: [],
    noutoAloitettu: false,
    noutoEpäonnistui: false,
    noutoValmis: false,
    auto5: false,
    timeri: {} });

  // main useEffect
  useEffect(() => {
    async function haeDataa() {
      try {
        dispatch({ type: 'K_NOUTO_ALOITETTU' })
        // haetaan api:sta kategoriat categories-muuttujalle
          let categories = await axios('https://api.chucknorris.io/jokes/categories');
        // saadut kategoriat lähetetään payloadina reducerille
        dispatch({ type: 'K_NOUDETTU', payload: categories.data })
        // console.log("noudettu categories:", categories.data) // (array)
        // console.log("full json api:sta, /kategoriat noudettu:", categories)

        dispatch({ type: 'V_NOUTO_ALOITETTU' })
        // haetaan api:sta random vitsi (objekti) joke-muuttujalle
          let joke = await axios('https://api.chucknorris.io/jokes/random');
        // koko joke ({}) payloadina reducerin vitsiObjektiin
        dispatch({ type: 'V_NOUDETTU', payload: joke })
          // console.log("noudettu vitsi json:", joke)
      }
      catch (error) {
        console.log("Los Proplemos:", error)
        dispatch({ type: 'NOUTO_EPÄONNISTUI' })
      }
    };
    haeDataa();
  }, []);
  // end main useEffect

  // auto5sec joke fetch (unable to call f inside useEffect?)
  useEffect(() => {
    let timeri;
    async function autofetchJK() {
      // appData.auto5 == true ? timeri : null;
      if(appData.auto5 == true) { timeri = setInterval(getRandomJK, 5000); }
    }
    autofetchJK();
    return clearInterval(timeri);
  }, [appData.auto5]);

  // onClick funktiot:
  async function getRandomJK() {
    try {
      dispatch({ type: 'V_NOUTO_ALOITETTU' })
      let joke = await axios('https://api.chucknorris.io/jokes/random');
      dispatch({ type: 'V_NOUDETTU', payload: joke })
    }
    catch (error) {
      console.log("Los Proplemos getRandomJK funktiosta:", error)
      dispatch({ type: 'NOUTO_EPÄONNISTUI' })
    }
  };

  // console.log("staten vitsiObjekti:", appData.vitsiObjekti)
  // console.log("state (appData):", appData)

  return (
    <>
      <div className='outer-wrapper'>
        <div className='chuck-wrapper'>
          <div className='chuck-button'
            onClick={() => {
              getRandomJK();
              console.log("random joke div click")
            }}
            >get a random joke
          </div>

          <div className='chuck-button'
            onClick={() => {
              autofetchJK();
              dispatch({ type: 'AUTOFETCH', payload: timeri }) // error
              console.log("new joke 5s div click")
            }}
            >new joke every 5 secs
          </div>

          <div className='chuck-button'
            onClick={() => {
              console.log("localSto div click")
            }}
            >jokes from localStorage
          </div>

          <div className='chuck-button'
            onClick={() => {
              console.log("challenge div click")
            }}
            >time challenge
          </div>
        </div>

        <div className='chuck-wrapper'>
          <div className='chuck-categories'>
            <h3>Chuck Categories:</h3>
              {appData.kategoriat.map(item => <p>{item}</p>)}
          </div>

          {/* <div className='chuck-joke'>
            <h3>Random Chuck Joke:</h3>
              <p>{appData.vitsi}</p>
          </div> */}

          <div className='chuck-joke'>
            {appData.noutoValmis == true ?
            <>
              <h3>Random Chuck Joke:</h3>
                <p>{appData.vitsiObjekti.data.value}</p>
              <h4>Jokes ID:</h4>
                <p>{appData.vitsiObjekti.data.id}</p>
            </> : <p>Venataan fetchiä ('loading screen' tähän)</p>}
          </div>

          <div className='ui-info-box'>
            {appData.noutoAloitettu && "UI notification: Nouto aloitettu" }
            {appData.noutoEpäonnistui && "UI notification: Nouto epäonnistui" }
            {appData.noutoValmis && "UI notification: Nouto on valmis" }
          </div>
        </div>
      </div>
    </>
  );
};

export default ChuckJokes;