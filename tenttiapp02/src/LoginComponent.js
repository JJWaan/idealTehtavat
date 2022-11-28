import React from "react";

import { useState } from "react";
import axios from "axios";

const LoginSignup = () => {
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
        catch (error) { console.log('perskele') }
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
{/* tämä sidotaan /signup routeen */}
{/* signupissa on seuraava: const { email, password } = request.body; */}
                <form id="signup-form">
                    <input
                        id="form-input"
                        name="kayttaja_nimi"
                        type="text"
                        placeholder="Sinun nimesi"
                        onChange={ (kirjoitus) => { console.log("signup nimi txt:", kirjoitus.target.value) } }
                        // tähän joku funk
                    />

                    <input
                        id="form-input"
                        name="kayttaja_email"
                        type="email"
                        placeholder="nimesi@sähköposti.com"
                        onChange={ (kirjoitus) => { console.log("signup email txt:", kirjoitus.target.value) } }
                        // tähän joku funk
                    />

                </form>
                    <button
                        className="login-signup-button"
                        form="signup-form"
                        onClick={() => {console.log("signuppi nappi")}}
                        // tähän joku funktio mikä lähettää formin kamat eteenpäi
                        >Luo käyttäjä
                    </button>

            </div>

        </div>
    )
};

export default LoginSignup;