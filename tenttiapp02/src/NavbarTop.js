import React from "react";

const NavbarTop = ({ tokensetter }) => {

    const kayttajanimi = localStorage.getItem('loggedin-kayttajanimi');
    const kayttajaid = localStorage.getItem('loggedin-kayttajaid');
    const kayttajaemail = localStorage.getItem('loggedin-kayttajaemail');

    function KirjauduUlos() {
        localStorage.removeItem('jwt-tokeni');
        console.log('jwt-token removed from localstorage');
        localStorage.removeItem('loggedin-kayttajanimi');
        localStorage.removeItem('loggedin-kayttajaid');
        localStorage.removeItem('loggedin-kayttajaemail');
        console.log('userdata removed from localstorage');
        tokensetter()
    };

    return (
        <>
            <nav>
                <p className="kayttajainfo">{kayttajanimi}</p>
                <p className="kayttajainfo">{kayttajaid}</p>
                <p className="kayttajainfo">{kayttajaemail}</p>
                <p onClick={KirjauduUlos}>Sign Out</p>
                <p>About</p>
            </nav>
        </>
    )
};

export default NavbarTop;