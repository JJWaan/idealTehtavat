const NavbarLeft = ( { tentit } ) => {

    const puretut = tentit?.map((item) => {
        return (
                <p key={item.tentti_id}>{item.tentti_nimi}</p>
        )
    });

    return (
        <div className="nav-left">
            {puretut}
        </div>
    )
};

export default NavbarLeft;