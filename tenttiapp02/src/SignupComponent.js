import { useState } from "react";
import axios from "axios";

// signup logic and form.
// one of the main elements for LandingPage.js

const Signup = () => {
    const [signup, setSignup] = useState({ kayttaja_nimi: "", kayttaja_email: "", kayttaja_salasana: "" })

    const signupKirjoitusta = (event) => {
        const { name, value } = event.target;
        setSignup({ ...signup, [name]: value });
    };

    const signupPostaaja = async (event) => {
        event.preventDefault();
        try {
            if (!signup.kayttaja_nimi || !signup.kayttaja_email || !signup.kayttaja_salasana) {
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

    // state to give the user feedback @ UI after button-click :
    const [signupButtonClicked, setSignupButtonClicked] = useState(false);

    // state handlers for UI feedback.
    // these are separated to true/false-functions,
    // to ensure the following setTimeout-fns functionality.
    const onSignupButtonClick = () => {
        setSignupButtonClicked(true);
    };

    const onSignupButtonClickFalse = () => {
        setSignupButtonClicked(false);
    };

    // timer for UI feedback
    const signupFeedbackFadeout = () => {
        const feedbackTimeout = setTimeout(onSignupButtonClickFalse, 4000);
        function myStopFunction() {
            clearTimeout(feedbackTimeout);
        };
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

                <div className="signup-popup-container">

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
            </div>
        </>
    )
};

export default Signup;