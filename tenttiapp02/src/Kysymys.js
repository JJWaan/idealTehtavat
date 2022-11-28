import Vastaus from "./Vastaus";

// Kysymys komponentti

const Kysymys = ({ kaikkidata }) => {
  console.log("käytiin Kysymys.js:ssä, kaikkidata sisältö:", kaikkidata);

  // mappaa kaiken mitä on tullu kysymys-taulusta
  const kaikkiKys = kaikkidata.resKysymys.map((item, i) => {
    return (
      <div key={i} className="kysymys">
        <span className="kysymys-title">{item.kysymys_teksti}</span>
        <span className="kysymys-id">id: ({item.kysymys_id})</span>
        {/* <p className="p-desc">kysymyksen pisteet: {item.kysymys_pisteet}</p> */}

        {/* lähettää saman datan propsina eteenpäin Vastaus-komponentille */}
        {/* <Vastaus kaikkidataTaas={kaikkidata} /> */}
      </div>
    );
  });

  // mappaa kaiken mitä on tullu liitos-taulusta
  const liitostaulunSisalto = kaikkidata.resLiitos.map((itemi) => {
    return (
      itemi.kysymyksen_id
    );
  })

  console.log("liitos kiitos:", liitostaulunSisalto);
  // itemin sisältö näyttää tältä:
// kysymyksen_id: "22"
// ​​kysymys_id: "22"
// ​kysymys_pisteet: "1000"
// ​kysymys_teksti: "Onko tämä kysymys? Se on erittäin hyvä kysymys."
// ​tentin_id: "0"

  // function checkkaaKysymysID() {
    // jos kysymys_id (kysymys-taulusta) on sama kuin kysymyksen_id (liitos-taulusta)
  //   return se id
  // }

  // function checkkaaKysymysID() {
  //   if(kaikkiKys.kysymys_id === liitostaulunSisalto.kysymyksen_id) {
  //     return kaikkiKys.kysymyksen_id
  //   }
  // };

  return (
    <div className="kysymykset">
        {kaikkiKys}
    </div>
  );
};

export default Kysymys;