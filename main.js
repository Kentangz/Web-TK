console.log("Hello, World!");

const x = 5

function tambah (x){
    let y = x + x;
    return y;
}

function cek() {
    if (x % 2 === 0) {
        return "genap";
    } else {
        return "ganjil";
    }
}

function cek1() {
    if (x % 2 === 0) {
        return "genap";
    } else if (x % 2 === 1) {
        return "ganjil";
    } else {
        return "undefined";
    }
}

let salam1= "hallo"
let salam2= "hallo hai"
let salam3= "hallo hai hallo"


let salam = "hai"


console.log(tambah(5))
console.log(cek())
console.log(cek1())
console.log(salam)
console.log(salam1)
console.log(salam2)
console.log(salam3)
