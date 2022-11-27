import React from "react";

const LoginSignup = () => {
    return (
        <div className="forms-container">

            <div className="form-container">
                <form id="login-form">
                    <input
                        id="login-signup-form-input"
                        name="kayttaja_id"
                        type="text"
                        placeholder="Sinun nimesi"
                        onChange={ (kirjoitus) => { console.log("login nimi txt:", kirjoitus.target.value) } }
                    />

                    <input
                        id="login-signup-form-input"
                        name="kayttaja_salasana"
                        type="password"
                        placeholder="Salanasi"
                        onChange={ (kirjoitus) => { console.log("login salasana txt:", kirjoitus.target.value) } }
                    />

                </form>
                <button
                        className="login-signup-button"
                        form="login-form"
                        onClick={() => {console.log("login nappi")}}
                        >Kirjaudu sisään
                    </button>

            </div>

            <div className="form-container">
                <form id="signup-form">
                    <input
                        id="login-signup-form-input"
                        name="kayttaja_nimi"
                        type="text"
                        placeholder="Sinun nimesi"
                        onChange={ (kirjoitus) => { console.log("signup nimi txt:", kirjoitus.target.value) } }
                    />

                    <input
                        id="login-signup-form-input"
                        name="kayttaja_email"
                        type="email"
                        placeholder="nimesi@sähköposti.com"
                        onChange={ (kirjoitus) => { console.log("signup email txt:", kirjoitus.target.value) } }
                    />

                </form>
                    <button
                        className="login-signup-button"
                        form="signup-form"
                        onClick={() => {console.log("signuppi nappi")}}
                        >Luo käyttäjä
                    </button>
            </div>
        </div>
    )
};

export default LoginSignup;