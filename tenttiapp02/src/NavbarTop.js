import React from "react";

const NavbarTop = ({ tokensetter }) => {

    const kayttajanimi = localStorage.getItem('loggedin-kayttajanimi');

    function KirjauduUlos() {
        localStorage.removeItem('jwt-tokeni');
        localStorage.removeItem('loggedin-kayttajanimi');
        console.log('jwt-token removed from localstorage');
        tokensetter()
    };

    return (
        <>
            <nav>
                <p>{kayttajanimi}</p>
                <p onClick={KirjauduUlos}>Sign Out</p>
                <p>About</p>
            </nav>
        </>
    )
};

export default NavbarTop;