import { useState } from "react";
import axios from "axios";

// login and signup logics and forms.
// one of the main elements for LandingPage.js

const LoginSignup = ({ tokensetter }) => {

    // login:
    const [login, setLogin] = useState({ kayttaja_email: "", kayttaja_salasana: "" })

    const loginKirjoitusta = (kirjoitus) => {
        const { name, value } = kirjoitus.target
        setLogin({...login, [name]: value})
    };

    const loginPostaaja = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("https://localhost:4000/login", {
                email: login.kayttaja_email,
                password: login.kayttaja_salasana,
            });

            localStorage.setItem("jwt-tokeni", data.kekkonen.token);
            console.log('User logged in with:', data);
            localStorage.setItem("loggedin-kayttajanimi", data.kekkonen.usernimi)
            // tokensetter(true)
        }
        catch (error) { console.log("Login error:", error) }
    };

    // signup:
    const [signup, setSignup] = useState({ kayttaja_nimi: "", kayttaja_email: "", kayttaja_salasana: "" })

    const signupKirjoitusta = (event) => {
        const { name, value } = event.target;
        setSignup({ ...signup, [name]: value });
    };

    const signupPostaaja = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("https://localhost:4000/signup", {
                nimi: signup.kayttaja_nimi,
                email: signup.kayttaja_email,
                password: signup.kayttaja_salasana,
            });
            console.log('New user created & saved to database with:', data);
            setSignup({ kayttaja_nimi: "", kayttaja_email: "", kayttaja_salasana: "" });
        }
        catch (error) { console.log('Signup error:', error); }
    };

    // state to give the user feedback @ UI after button-click :
    const [buttonClicked, setButtonClicked] = useState(null)

    const tuplapukki = () => {
        setButtonClicked(true);
        tokensetter();
    };

    const ShowFeedback = () => {
        // on form button click, auto-scroll to next element
        const skrollaaja = document.querySelector('#skroll');
            skrollaaja.scrollIntoView({
                behavior: 'smooth'
        });
        // and view a info-box
        return (
            <div className="show-feedback">
                <p>UI feedback for user</p>
            </div>
        );
    };

    return (
        <>
            <div className="forms-container">

                {buttonClicked ? <ShowFeedback /> : null}

                <div className="form-container">
                    <form id="login-form" onSubmit={ loginPostaaja }>
                        <input
                            id="form-input"
                            name="kayttaja_email"
                            type="text"
                            placeholder="Sähköpostiosoitteesi"
                            onChange={ loginKirjoitusta }
                        />

                        <input
                            id="form-input"
                            name="kayttaja_salasana"
                            type="password"
                            placeholder="Salanasi"
                            onChange={ loginKirjoitusta }
                        />
                    </form>
                        <button
                            className="login-signup-button"
                            form="login-form"
                            onClick={ () => tuplapukki() }
                            >Kirjaudu sisään
                        </button>
                </div>

                <div className="form-container">
                    <form id="signup-form" onSubmit={ signupPostaaja }>
                        <input
                            id="form-input"
                            name="kayttaja_nimi"
                            type="text"
                            placeholder="Uusi käyttäjänimi"
                            onChange={ signupKirjoitusta }
                        />

                        <input
                            id="form-input"
                            name="kayttaja_email"
                            type="email"
                            placeholder="Sähköpostiosoitteesi"
                            onChange={ signupKirjoitusta }
                        />

                        <input
                            id="form-input"
                            name="kayttaja_salasana"
                            type="password"
                            placeholder="Uusi salasana"
                            onChange={ signupKirjoitusta }
                        />

                    </form>
                        <button
                            className="login-signup-button"
                            form="signup-form"
                            onClick={() => setButtonClicked(true) }
                            >Luo käyttäjä
                        </button>

                </div>
            </div>
        <div className="skroll" id="skroll"></div>
        </>
    )
};

export default LoginSignup;