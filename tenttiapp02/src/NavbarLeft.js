const NavbarLeft = ( { tentit } ) => {
    
    const puretut = tentit?.map((item) => {
        return <div key={item.tentti_id}><p key={item.tentti_id}>{item.tentti_nimi}</p></div>
    });

    return (
        <div className="nav-left">
            {puretut}
        </div>
    )
};

export default NavbarLeft;