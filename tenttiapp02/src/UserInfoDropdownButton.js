import { useState } from "react";

import UserDropdownMenu from "./UserDropdownMenu";

const UserInfoDropdownButton = ({ tokensetter }) => {
    const [showUserInfoDropdownMenu, setShowDropdown] = useState(false);

    const showDropmenu = () => { setShowDropdown(!showUserInfoDropdownMenu) };

    const kayttajanimi = localStorage.getItem('loggedin-kayttajanimi');

    return (
        <div onClick={showDropmenu}>
            <p>{kayttajanimi}</p>
            {showUserInfoDropdownMenu ? <UserDropdownMenu tokensetter={tokensetter} /> : null}
        </div>
    )
};

export default UserInfoDropdownButton;