import React from "react";

import TenttiPickerDropdownButton from "./TenttiPickerDropdownButton";
import UserInfoDropdownButton from "./UserInfoDropdownButton"

const NavbarTop = ({ tokensetter, tentit }) => {

    return (
        <>
            <div className="skroll" id="skroll"></div>
            <nav>
                <div className="navbar-leftside-items">
                    <TenttiPickerDropdownButton tentit={tentit} />
                </div>
                <div className="navbar-rightside-items">
                    <UserInfoDropdownButton tokensetter={tokensetter} />
                </div>
            </nav>
        </>
    )
};

export default NavbarTop;