const res = require('express/lib/response');
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

// lue kaikki data backendistä konsoliin
// pool.query('SELECT * FROM tentti_backend', (err, res) => {
//   console.log(err, res.rows)
//   pool.end()
// });

// async funktiot:

  // kaikki data, nimi-kolumnin sisällön perusteella
const haeNimi = async () => {
  try {
    let result = await pool.query("SELECT * FROM tentti_backend WHERE nimi='eka_value'")
    console.log("select nimi=x:", result.rows[0].nimi)
    console.log("selected, command:", result.command);
    console.log("selected, rowCount:", result.rowCount);
  } catch (error) { console.log("select Err:", error) }
  pool.end();
}
// haeNimi();

  // kaikki data, id:n perusteella
const haeID = async () => {
  try {
    let result = await pool.query("SELECT * FROM tentti_backend WHERE id=2")
    console.log("Haettu (koko objekti) id:n perusteella:", result)
    console.log("Haetun objektin nimi-kenttä:", result.rows[0].nimi)
    console.log("selected, command:", result.command);
    console.log("selected, rowCount:", result.rowCount);
  } catch (error) { console.log("select Err:", err) }
  pool.end();
}
// haeID();

  // kaikki data, nimi-kolumnin rivit aakkosjärjestyksessä
const aakkosValue = async () => {
  try {
    let result = await pool.query("SELECT * FROM tentti_backend ORDER BY nimi ASC")
    console.log("select by ascending order:", result.rows)
    console.log("selected, command:", result.command);
    console.log("selected, rowCount:", result.rowCount);
  } catch (error) { console.log("select Err:", error) }
  pool.end();
}
// aakkosValue();

  // hae dataa id:den perusteella, IN-ehdolla
const haeTiettyja = async () => {
  try {
    let result = await pool.query("SELECT * FROM tentti_backend WHERE id IN (1, 2, 3, 8)")
    console.log("select id 1,2,3,8:", result.rows)
    console.log("selected, command:", result.command);
    console.log("selected, rowCount:", result.rowCount);
  } catch (error) { console.log("select Err:", error) }
  pool.end();
}
// haeTiettyja();

  // hae dataa id:den perusteella, NOT IN-ehdolla
const haeMuttaEiNaita = async () => {
  try {
    let result = await pool.query("SELECT * FROM tentti_backend WHERE id NOT IN (1, 2, 3, 8)")
    console.log("select id:s not including id # 1,2,3,8:", result.rows)
    console.log("selected, command:", result.command);
    console.log("selected, rowCount:", result.rowCount);
  } catch (error) { console.log("select Err:", error) }
  pool.end();
}
// haeMuttaEiNaita();

  // Lisää backendiin, nimi-kolumniin (id tehdään pgAdmin:ssa)
const lisaaValue = async () => {
  try {
    let result = await pool.query("INSERT INTO tentti_backend (nimi) VALUES ('jokisen asia')")
    console.log("insert (object) into backend:", result)
    console.log("insert command:", result.command)
    console.log("insert rowCount:", result.rowCount)
  } catch (error) { console.log("insert into Err:", error) }
  pool.end();
}
// lisaaValue();

  // Poista yksi objekti backendistä, id:n perusteella
const poistaValue = async () => {
  try {
    let result = await pool.query("DELETE FROM tentti_backend WHERE id=11")
    console.log("deleted from backend, command:", result.command)
    console.log("deleted from backend, rowCount:", result.rowCount)
  } catch (error) { console.log("delete from where id=x Err:", error) }
  pool.end();
}
// poistaValue();

  // Muuta tiettyä nimi-kenttää, id:n perusteella
const updateValue = async () => {
  try {
    let result = await pool.query("UPDATE tentti_backend SET nimi='moi' WHERE id=14;")
    console.log("updated, full result:", result)
    console.log("updated, command:", result.command)
    console.log("updated, rowCount:", result.rowCount)
  } catch (error) { console.log("update where id=x Err:", error) }
  pool.end();
}
// updateValue();

  // Lisää boolean-tietotyypin kolumni databaseen
const lisaaKolumni = async () => {
  try {
    await pool.query("ALTER TABLE tentti_backend ADD totta_vai_tarua boolean")
    console.log("altered table succesfully");
  } catch (error) { console.log("failed to alter table:", error); }
  pool.end();
}
// lisaaKolumni();

  // Aseta kaikkien objektien boolean-arvo (jätetään WHERE pois)
  // tässä voi sanoa: (true, 1, y, on) / (false, 0, n, off)
const asetaBoolean = async () => {
  try {
    await pool.query("UPDATE tentti_backend SET totta_vai_tarua = '0'")
    console.log("booleans updated succesfully");
  } catch (error) { console.log("update boolean error:", error); }
  pool.end();
}
// asetaBoolean();

  // Aseta osoitetun objektien boolean-arvo (WHERE)
const asetaTiettyBoolean = async () => {
  try {
    await pool.query("UPDATE tentti_backend SET totta_vai_tarua = '1' WHERE id=9")
    console.log("single boolean updated succesfully");
  } catch (error) { console.log("update boolean error:", error); }
  pool.end();
}
// asetaTiettyBoolean();

  // hae data, minkä boolean-kentän arvo on false
const haeFalse = async () => {
  try {
    let result = await pool.query("SELECT * FROM tentti_backend WHERE totta_vai_tarua='0'")
    console.log("boolean=false :", result.rows);
  } catch (error) { console.log("select Err", error); }
  pool.end();
}
// haeFalse();

  // hae objektin nimi, jonka "päivämäärä" on ennen 12.10.2022 (lisää date-tyyppinen kenttä)
const haePVM = async () => {
  try {
    result = await pool.query("SELECT * FROM tentti_backend WHERE pvm < '12.10.2022'")
    console.log("haku osoitetulla päivämäärällä, nimi:", result.rows);
    console.log("selected, command:", result.command);
    console.log("selected, rowCount:", result.rowCount);
  } catch (error) { console.log("select Err:", error); }
  pool.end();
}
// haePVM();

  // Vaihda tiettyä pvm:ää, id:n perusteella
const asetaPVM = async () => {
  try {
    await pool.query("UPDATE tentti_backend SET pvm = '1.10.1989' WHERE id=7")
    console.log("single date updated succesfully");
  } catch (error) { console.log("update date error:", error); }
  pool.end();
}
// asetaPVM();



// --- --- ---
// notes:

// If you omit the WHERE clause, all records in the table will be updated/deleted!

// UPDATE / DELETE FROM table_name
// SET column1 = value1,
//  column2 = value2, ...
// WHERE condition; <-- important

// --- --- ---
// SELECT = select all (myös, vaikka samoja arvoja kentissä)
// SELECT DISCTINCT = select poikkeavat arvot
// The following SQL statement lists the number of different (distinct) db, taulu:
// SELECT COUNT(DISTINCT taulu) FROM database;
// tai:
// SELECT Count(*) AS DistinctTaulut
// FROM (SELECT DISTINCT taulu FROM Customers);
// ts.:
// Select all the different values from the Country column in the Customers table.
// SELECT DISTINCT Country FROM Customers

// --- --- ---
// The IN operator allows you to specify multiple values in a WHERE clause.
// The IN operator is a shorthand for multiple OR conditions.