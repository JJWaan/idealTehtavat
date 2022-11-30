import React from "react";

import LoginPageHeader from "./LoginPageHeader";
import LoginSignup from "./LoginComponent";

// this exists as a parent render component that renders needed/wanted elements,
// for easier control over child-components and to make code cleaner.

const LandingPage = ({ tokensetter }) => {
    return (
        // <div className="landing-page">
            <div className="landing-page-wrapper">
                <LoginPageHeader />
                <LoginSignup tokensetter={tokensetter} />
            </div>
        // </div>
    );
};

export default LandingPage;