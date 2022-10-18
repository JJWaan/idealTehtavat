import Kysymys from "./Kysymys";

// yksittäisen tentin rendaus komponentti
const Tentti = ({ dispatch, tentti }) => {
  const kysymykset = tentti.map((item, index) => {
    // console.log("tentti.map itemi", item)
    return (
      <Kysymys
        key={index}
        kysymys={item.tenttiYksi}
        dispatch={dispatch}
      />
    );
});

  return (
    <div className="tentti">
      {kysymykset}
    </div>
  );
};

export default Tentti;