
import { useState } from "react";

import TentitDropdownMenu from "./TentitDropdownMenu";

const TenttiPickerDropdownButton = ({ tentit }) => {

    const [showTenttiPickerDropdownMenu, setShowDropdown] = useState(false);

    const showDropmenu = () => { setShowDropdown(!showTenttiPickerDropdownMenu) };

    return (
        <div onClick={showDropmenu}>
            <p>Valitse tentti</p>
            {showTenttiPickerDropdownMenu ? <TentitDropdownMenu tentit={tentit} /> : null}
        </div>
    )
};

export default TenttiPickerDropdownButton;