import React from "react";
import { useState } from "react";

import LandingPageHeader from "./LandingPageHeader";
import Login from "./LoginComponent";
import Signup from "./SignupComponent";

// this exists as a parent render component that renders needed/wanted elements,
// for easier control over child-components and to make the code cleaner.

const LandingPage = ({ tokensetter }) => {
    // state to determine signup-form visibility
    const [signupFormVisible, setSignupFormVisible] = useState(false);

    const onSignupButtonClick = () => {
        setSignupFormVisible(!signupFormVisible);
    };

    return (
        // <div className="landing-page">
            <div className="landing-page-wrapper">
                <LandingPageHeader />
                <div className="forms-container">
                    <Login tokensetter={tokensetter} />
                    <button id="forgot-pw">Unohditko salasanasi?</button>
                    <button id="luo-uusi-kayttaja-link"onClick={onSignupButtonClick}>Luo uusi käyttäjä</button>
                    { signupFormVisible ? <Signup /> : null }
                </div>
            </div>
        // </div>
    );
};

export default LandingPage;