const lista = [
    {"ma": 1},
    {"ti": 2},
    {"ke": 3},
    {"to": 4},
    {"pe": 5},
    {"la": 6},
    {"su": 7}
];

// reduce:
const parilliset = (lista) => {
    return lista.reduce((acc, item) => {
        if( Object.values(item)[0] % 2 === 0 ) {
            //return acc.concat([item])
            return [...acc, item]
        }
        else { return acc }
    },[])
};

console.log("reduce:", parilliset(lista))

//filter:
const parilliset2 = (lista) => lista.filter(item => Object.values(item)[0] % 2 === 0 )

console.log("filter:", parilliset2(lista));