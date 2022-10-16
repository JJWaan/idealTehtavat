// Tehtävä 1.22
// Seuraavat lauseet ovat tosia:
// Lause A on ”Pekka on vakosamettihousuinen mies”.
// Lause B on ”Rauni ei ole vihainen”.
// Lause C on ”Harri on yhdeksän”.
// Lause D on ”Sataa”.
// &amp;&amp; = JA
// || = TAI
// !=EI

// Ovatko seuraavat väittämät tosia?
// a) (!D || !C &amp;&amp; !B) (e)
    // ei D tai ei C ja ei B
// b) (D &amp;&amp; !B || !A) (e)
    // D ja ei B, tai ei A
// c) (!D || A) (t)
    // ei D tai A
// d) (B &amp;&amp; !A) (e)
    // B ja ei A
// e) (D &amp;&amp; !B || !A) || (!D || A) (t)
    // D ja ei B, tai ei A, tai ei D tai A
// f) (!(!C &amp;&amp; !B) &amp;&amp; (!D || B))
    // (ei (ei C ja ei B) ja (ei D tai B) )