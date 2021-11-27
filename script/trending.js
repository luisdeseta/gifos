/**
 * deprecated
 */

const btn = document.getElementById('btn1')
//archivo de pruebas
const arrayA = [1,2,3,4,5,6,7,8,9,10,11,12]

function newArraY (array, start, finish){
    //let start = 0;
    //let finish = 3;
    return console.log( array.slice(start, finish));
    
}

function imprimir (array, callback) {
    let start = 0
    let finish = 3
    callback(array, start, finish)

} 

setTimeout(() => {
    console.log("hola")
}, 200);

btn.addEventListener('click', () => {newArraY(arrayA, 0,16)})