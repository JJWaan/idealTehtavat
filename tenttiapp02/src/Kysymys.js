// Kysymys komponentti
const Kysymys = ({ kysymys, dispatch, kysymyksenIndex, tenttiIndex }) => {

  // console.log("vVaihtoehdot:", kysymys.vastausvaihtoehdot)


const vastausvaihtoehdot = kysymys.vastausvaihtoehdot.map((item, index) => {
    // console.log("kysymys.vastausvaihtoehdot", item);
    // console.log("kysymys-propsi Tentti-komponentilta", kysymys)

    return (
      <div key={index}>

        <input type="radio" value={item.vastaus} name="kysymys" />

          {/* vastauksen editointi: */}
        <input className="vastaus-input"
          type="text"
          value={item.vastaus}
          onChange={(event) => { dispatch({
              type: 'VASTAUS_MUUTETTU',
              payload: {
                uusiVastaus: event.target.value,
                vastauksenIndex: index,
                kysymyksenIndex: kysymyksenIndex,
                tenttiIndex: tenttiIndex
              },
            });
          }}
        />

      </div>
    );
});

    return (
      <div className="kysymys">

          <input className="kysymys-input" type="text"
            value={kysymys.kysymys}
            onChange={(event) =>
              dispatch({
                type: 'KYSYMYS_MUUTETTU',
                payload: {
                  kysymys: event.target.value,
                  index: kysymyksenIndex,
                  tenttiIndex: tenttiIndex
                },
              })
            }
          />

        {vastausvaihtoehdot}

      </div>
    );
};

export default Kysymys;