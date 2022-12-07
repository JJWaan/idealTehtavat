import { useState } from "react";
import axios from "axios";

// login logic and form.
// one of the main elements for LandingPage.js

const Login = ({ tokensetter }) => {
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
            // so i found out that you have to stringify it to make it work:
            // localStorage.setItem("loggedin-kayttajadata", JSON.stringify(
            //     {
            //         kayttajanimi: data.kekkonen.usernimi,
            //         kayttajaid: data.kekkonen.userId,
            //         kayttajaemail: data.kekkonen.email
            //     }
            // ));

            // alternative approach:
            localStorage.setItem("loggedin-kayttajanimi", data.kekkonen.usernimi);
            localStorage.setItem("loggedin-kayttajaid", data.kekkonen.userId);
            localStorage.setItem("loggedin-kayttajaemail", data.kekkonen.email);
        }
        catch (error) { console.log("Login error:", error) }
    };

    // state to give the user feedback @ UI after button-click :
    const [loginButtonClicked, setLoginButtonClicked] = useState(null);

    // auto-scroller on succesful login
    function scroller() {
        const skrollaaja = document.querySelector('#skroll');
        skrollaaja.scrollIntoView({
            behavior: 'smooth'
        });
    };

    // timer for above auto-scroller
    const letsScroll = () => {
        const scrollerTimeout = setTimeout(scroller, 1500);
        function myStopFunction() {
            clearTimeout(scrollerTimeout);
        };
    };

    // state handlers for UI feedback.
    // these are separated to true/false-functions,
    // to ensure the following setTimeout-fns functionality.
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

    const ShowLoginFeedback = () => {
        // const loggedinKayttajanimi = localStorage.getItem("loggedin-kayttajanimi");

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
                    {/* <p>Tervetuloa {loggedinKayttajanimi}!</p> */}
                    <p>Tervetuloa {login.kayttaja_email}!</p>
                </div>
            );
        }
    };

    return (
        <>
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

            <div className="show-feedback-container">
                {loginButtonClicked ? <ShowLoginFeedback /> : null}
            </div>
        </>
    )
};

export default Login;