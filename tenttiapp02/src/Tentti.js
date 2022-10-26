import Kysymys from "./Kysymys";

// yksittäisen tentin rendaus komponentti
const Tentti = ({ tentti, dispatch }) => {

  const kysymykset = tentti.map((item, tenttiIndex) => {
    return (<>
      {
        item.tenttiItessaan.map((item, index) => {
          return (
            <Kysymys
              key={index}
              kysymys={item}
              dispatch={dispatch}
              kysymyksenIndex={index}
              tenttiIndex={tenttiIndex} />
          )
        })
      }
    </>)
  })

  return (
    <div className="tentti">
      {kysymykset}
    </div>
  );
};

export default Tentti;