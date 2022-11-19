const Tentti = ({ tentti }) => {
console.log("käytiin tentti.js:ssä, tentti-propsin sisältö:", tentti);

const kaikki = tentti.map((item, i) => { return (
  <div key={i}>
    Täs mäpätää pelkästää tentti-taulun sisältöä mut ei tosiaa muuta koska mutsis oli mummos:
    <p>Tentti nimeltä: {item.tentti_nimi}</p>
    <p>{item.tentti_kuvaus}</p>
    <p>tentin id: {item.tentti_id}</p>
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