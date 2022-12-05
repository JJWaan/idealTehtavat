
// drop down menu onclick of TenttiPickerDropdownButton.js

const TentitDropdownMenu = ({ tentit }) => {

    const purettuTenttidata = tentit?.map((item) => {
        return (
                <p key={item.tentti_id}>{item.tentti_nimi}</p>
        )
    });

    return (
        <div className="nav-top-tentti-dropdownmenu">
            <div className="nav-top-tentti-dropdownmenu-elements">
                {purettuTenttidata}
            </div>
        </div>
    );
};

export default TentitDropdownMenu;