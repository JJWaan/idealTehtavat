
// drop down menu onclick of UserInfoDropdownButton.js

const kayttajanimi = localStorage.getItem('loggedin-kayttajanimi');
const kayttajaid = localStorage.getItem('loggedin-kayttajaid');
const kayttajaemail = localStorage.getItem('loggedin-kayttajaemail');

const UserDropdownMenu = ({ tokensetter }) => {

    function KirjauduUlos() {
        localStorage.removeItem('jwt-tokeni');
        console.log('jwt-token removed from localstorage');
        localStorage.removeItem('loggedin-kayttajanimi');
        localStorage.removeItem('loggedin-kayttajaid');
        localStorage.removeItem('loggedin-kayttajaemail');
        localStorage.removeItem('signedup-kayttajanimi');
        localStorage.removeItem('signedup-kayttajaemail');
        console.log('userdata removed from localstorage');
        tokensetter();
    };

    return (
        <div className="nav-top-user-dropdownmenu">
            <div className="nav-top-user-dropdownmenu-elements">
                <p>{kayttajaemail}</p>
                <p>{kayttajanimi}</p>
                <p>{kayttajaid}</p>
                <p className="userDropdownMenu-signout-btn" onClick={ KirjauduUlos }>Kirjaudu ulos</p>
            </div>
        </div>
    );
};

export default UserDropdownMenu;