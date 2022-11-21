const Tentti = ({ tentti }) => {
console.log("käytiin tentti.js:ssä, tentti-propsin sisältö:", tentti);

const kaikki = tentti.map((item, i) => { return (
  <div key={i}>
    map pelkästää tentti-taulun sisältöä mut ei tosiaa muuta, koska lapio:
    <p className="p-title">{item.tentti_nimi}</p>
    <p className="p-desc">{item.tentti_kuvaus}</p>
    <p className="p-id">tentti id, moi: {item.tentti_id}</p>
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