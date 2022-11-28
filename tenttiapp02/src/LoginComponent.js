import React from "react";

import { useState } from "react";
import axios from "axios";

const LoginSignup = () => {

    // login:
    const [login, setLogin] = useState({ kayttaja_id: "", kayttaja_salasana: "" })

    const loginKirjoitusta = (kirjoitus) => {
        const { name, value } = kirjoitus.target
        setLogin({...login, [name]: value})
    };

    const loginPostaaja = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("https://localhost:4000/login", {
                email: login.kayttaja_id,
                password: login.kayttaja_salasana,
            });

            localStorage.setItem("jwt-tokeni", data.kekkonen.token);
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
                name: signup.kayttaja_nimi,
                email: signup.kayttaja_email,
                password: signup.kayttaja_salasana,
            });
            console.log("dadadaa:", data);
            // setSignup({ kayttaja_nimi: "", kayttaja_email: "", kayttaja_salasana: "" });
        }
        catch (error) { console.log("Signup error:", error); }
    };

    return (
        <div className="forms-container">

            <div className="form-container">
                <form id="login-form" onSubmit={ loginPostaaja }>
                    <input
                        id="form-input"
                        name="kayttaja_id"
                        type="text"
                        placeholder="Sinun nimesi"
                        required onChange={ loginKirjoitusta }
                    />

                    <input
                        id="form-input"
                        name="kayttaja_salasana"
                        type="password"
                        placeholder="Salanasi"
                        required onChange={ loginKirjoitusta }
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
{/* signupissa on seuraava: const { nimi, email, password } = request.body; */}
                <form id="signup-form" onSubmit={ signupPostaaja }>
                    <input
                        id="form-input"
                        name="kayttaja_nimi"
                        type="text"
                        placeholder="Sinun nimesi"
                        required onChange={ signupKirjoitusta }
                    />

                    <input
                        id="form-input"
                        name="kayttaja_email"
                        type="email"
                        placeholder="nimesi@sähköposti.com"
                        required onChange={ signupKirjoitusta }
                    />

                    <input
                        id="form-input"
                        name="kayttaja_salasana"
                        type="password"
                        placeholder="Salasana"
                        required onChange={ signupKirjoitusta }
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