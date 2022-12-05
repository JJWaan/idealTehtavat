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
            if (!login.kayttaja_email || !login.kayttaja_salasana) {
                throw new Error();
            }
            const { data } = await axios.post("https://localhost:4000/login", {
                email: login.kayttaja_email,
                password: login.kayttaja_salasana,
            });

            localStorage.setItem("jwt-tokeni", data.kekkonen.token);
            console.log('User logged in with:', data);
            // this doesn't work, returns [object Object] :
            // localStorage.setItem("loggedin-kayttajadata", {
            //     kayttajanimi: data.kekkonen.usernimi,
            //     kayttajaid: data.kekkonen.userId,
            //     kayttajaemail: data.kekkonen.email
            // });
            // so instead:
            localStorage.setItem("loggedin-kayttajanimi", data.kekkonen.usernimi);
            localStorage.setItem("loggedin-kayttajaid", data.kekkonen.userId);
            localStorage.setItem("loggedin-kayttajaemail", data.kekkonen.email);
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
            if (!login.kayttaja_email || !login.kayttaja_salasana) {
                throw new Error();
            }
            const { data } = await axios.post("https://localhost:4000/signup", {
                nimi: signup.kayttaja_nimi,
                email: signup.kayttaja_email,
                password: signup.kayttaja_salasana,
            });
            console.log('New user created & saved to database with:', data);
            setSignup({ kayttaja_nimi: "", kayttaja_email: "", kayttaja_salasana: "" });
            localStorage.setItem("signedup-kayttajanimi", data.data.nimi);
            localStorage.setItem("signedup-kayttajaemail", data.data.email);
        }
        catch (error) { console.log('Signup error:', error); }
    };

    // states to give the user feedback @ UI after button-click :
    const [loginButtonClicked, setLoginButtonClicked] = useState(null);
    const [signupButtonClicked, setSignupButtonClicked] = useState(null);

    // auto-scroller for better ux
    function scroller() {
        const skrollaaja = document.querySelector('#skroll');
        skrollaaja.scrollIntoView({
            behavior: 'smooth'
        });
    }
    // timer for auto-scroller
    const letsScroll = () => {
        const scrollerTimeout = setTimeout(scroller, 1500);
        function myStopFunction() {
            clearTimeout(scrollerTimeout);
        };
    };

    // state handlers for UI feedback
    const onSignupButtonClick = () => {
        setSignupButtonClicked(true);
    };

    const onSignupButtonClickFalse = () => {
        setSignupButtonClicked(false);
    };

    const onLoginButtonClick = () => {
        setLoginButtonClicked(true);
    };

    const onLoginButtonClickFalse = () => {
        setLoginButtonClicked(false);
    };

    // timers for UI feedback
    const loginFeedbackFadeout = () => {
        const feedbackTimeout = setTimeout(onLoginButtonClickFalse, 4000);
        function myStopFunction() {
            clearTimeout(feedbackTimeout);
        };
    };

    const signupFeedbackFadeout = () => {
        const feedbackTimeout = setTimeout(onSignupButtonClickFalse, 4000);
        function myStopFunction() {
            clearTimeout(feedbackTimeout);
        };
    };

    const ShowLoginFeedback = () => {
        const loggedinKayttajanimi = localStorage.getItem("loggedin-kayttajanimi");

        // yksi tapa validoida inputteja:
        // const loggedinKayttajaemail = localStorage.getItem("loggedin-kayttajaemail");

        // if (loggedinKayttajaemail == undefined) {
        //     return (
        //         <div className="show-feedback">
        //             <p>Sähköpostiosoitteesi tarvitaan</p>
        //         </div>
        //     )

        // toinen tapa, tutkitaan statea:
        if (!login.kayttaja_email || !login.kayttaja_salasana) {
            loginFeedbackFadeout();
            return (
                <div className="show-feedback">
                    <p>Sähköpostiosoitteesi, sekä salasanasi tarvitaan kirjautumiseen</p>
                </div>
            )
        } else {
            tokensetter();
            letsScroll();
            return (
                <div className="show-feedback">
                    <p>Tervetuloa {loggedinKayttajanimi}!</p>
                </div>
            );
        }
    };

    const ShowSignupFeedback = () => {
        const signeupKayttajanimi = localStorage.getItem("signedup-kayttajanimi");
        const signedupEmail = localStorage.getItem("signedup-kayttajaemail");

        if (!signup.kayttaja_nimi || !signup.kayttaja_email || !signup.kayttaja_salasana) {
            signupFeedbackFadeout();
            return (
                <div className="show-feedback">
                    <p>Kaikki kentät vaaditaan rekisteröitymiseen.</p>
                </div>
            )
        } else {
            return (
                <div className="show-feedback">
                    <p>Käyttäjä {signeupKayttajanimi} // {signedupEmail} luotu onnistuneesti.</p>
                    <p>Ole hyvä ja kirjaudu sisään!</p>
                </div>
            );
        }
    };

    return (
        <>
            <div className="forms-container">

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
                            onClick={ () => onLoginButtonClick() }
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
                            onClick={() => onSignupButtonClick() }
                            >Luo käyttäjä
                        </button>

                </div>
            </div>

            <div className="show-feedback-container">
                {signupButtonClicked ? <ShowSignupFeedback /> : null}
                {loginButtonClicked ? <ShowLoginFeedback /> : null}
            </div>
        </>
    )
};

export default LoginSignup;