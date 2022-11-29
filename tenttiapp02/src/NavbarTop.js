import React from "react";

const NavbarTop = ({tokensetter}) => {

    function KirjauduUlos() {
        localStorage.removeItem('jwt-tokeni')
        tokensetter(null)
        console.log('jwt-token removed from localstorage');
    };

    return (
        <>
            <nav>
                <p onClick={KirjauduUlos}>Sign Out</p>
                <p>About</p>
            </nav>
        </>
    )
};

export default NavbarTop;