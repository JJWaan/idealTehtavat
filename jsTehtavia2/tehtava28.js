// Tehtävä 2.8
// Selitä lyhyesti miten miten JavaScriptin sort-funktio toimii ja mitä tarkoittaa parametrina
// annettava compare-funktio.

/*
  Lyhyesti, ilman compare funktiota kaikki tiedot mitä sort funktiolle annetaan muunetaan ensin merkeiksi ja se lajittelee tiedot UTF-16 merkistön mukaisesti. Tämän vuoksi, esim numeroissa 100, tulee ennen 2, koska 1 on ennen 2 UTF-16.
  Compare funktionin avulla taas voidaan tarkemmin määritellä, minkälaisella algoritmillä voidaan päätellä, mikä tulee ennen mitäkin tiedonpätkää. Ilman tätä, sort muuntaa aina kaiken merkeiksi (string), josta lajittelu sitten tehdään.
*/