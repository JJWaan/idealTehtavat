const lista = ["asdasd", "bgbgbggbgb", "adfghrtg", "qwerty"];

tekstiIsoilla = lista.map(item => item.toUpperCase());

console.log("map:", tekstiIsoilla)

const lista2 = [
    {
        etunimi: "Pekka",
        sukunimi: "Moro"
    },
    {
        etunimi: "Liisa",
        sukunimi: "Tere"
    },
    {
        etunimi: "Ronaldo",
        sukunimi: "Pele"
    },
];

tekstiIsoilla2 = lista2.map(item => {
    return {...item, etunimi: item.etunimi.toUpperCase()}
});

console.log("uusi kopioitu lista:", tekstiIsoilla2)
console.log("vanha lista:", lista2)