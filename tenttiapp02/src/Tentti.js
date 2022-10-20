import Kysymys from "./Kysymys";

// yksittäisen tentin rendaus komponentti
const Tentti = ({ dispatch, tentti }) => {

  // console.log("tentti propsi:", tentti)

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