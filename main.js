console.log("Hello, World!");

const x = 5

function tambah (){
    let y = x + x
    return y
}

function cek() {
    if (x % 2 === 0) {
        return "genap";
    } else {
        return "ganjil";
    }
}

function cek2() {
    if (x % 2 === 0) {
        return "ganjil";
    }
    if ( x% 2 ===1){
        return "genap"
    } 
    else {
        return "undifined";
    }
}



console.log(tambah())
console.log(cek())
console.log(cek2())