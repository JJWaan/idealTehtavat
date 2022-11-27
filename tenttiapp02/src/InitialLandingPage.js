import React from "react";

import LandingPageHeader from "./LandingPageHeader";
import LoginSignup from "./LoginComponent";

const LandingPage = () => {
    return (
        <>
            <div className="landing-page">
                <LandingPageHeader />
                <LoginSignup />
            </div>
        </>
    );
};

export default LandingPage;