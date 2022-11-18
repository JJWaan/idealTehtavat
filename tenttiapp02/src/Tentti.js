// import Kysymys from "./Kysymys";

// yksittäisen tentin rendaus komponentti
const Tentti = ({ tentti }) => {
  console.log("käytiin tentti.js:ssä", tentti);
  // const kysymykset = tentti.map((item, tenttiIndex) => {
  //   return (<>
  //     {
  //       item.tenttiItessaan.map((item, index) => {
  //         return (
  //           <Kysymys
  //             key={index}
  //             kysymys={item}
  //             dispatch={dispatch}
  //             kysymyksenIndex={index}
  //             tenttiIndex={tenttiIndex} />
  //         )
  //       })
  //     }
  //   </>)
  // })

const kaikki = tentti.map((item, i) => { return (
    <div key={i}>
      <p>{item.tentti_nimi}</p>
      <p>{item.tentti_id}</p>
    </div>
  )});

// console.log('tässä kaikki:', kaikki);

  return (
    <div className="tentti">
      {kaikki}
    </div>
  );
};

export default Tentti;