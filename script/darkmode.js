//Boton crear Gifo

const createClick = () =>{
  window.location = "/pages/create.html"
}
// Logo
const logoClick = () =>{
  window.location = "../index.html"
}

/**
 * @description dark theme button. cambia la clase de los elementos.
 * usar el metodo de Cris, ver local storage
 *  
 */
const darkButton = document.getElementById("darkSwitch");
//let darkMode = false;
//sessionStorage.setItem("d", false)
const  DD = ()=>{
  let i = localStorage.getItem("d")
  //console.log("i  " + i)
  if (i) {
    return localStorage.getItem("d")
  } else {
    return localStorage.setItem("d", false)
  }
  
}
//tarda en recuperar el valor en la ejecucion, por eso trae null
//DD()
//let darkMode = DD();
//console.log("DD =>" + darkMode)

const changeMode = () =>{
  const classArray = document.body.classList;
  //JSON.parse(localStorage.getItem("d"));
  let darkMode = false
  //let darkMode = !sessionStorage.getItem("d")
  darkMode = !darkMode
  console.log("!darkMode =>" + darkMode)
  // el simbolo "!" me niega la variable booelana
  // false---- false false
  // true ---- false true
  if(!!darkMode){
    darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";  
    document.body.classList.add("theme--dark");
  } else{
    darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";  
    document.body.classList.remove("theme--dark");
  }
  localStorage.setItem("d", darkMode)
  console.log("darkMode " + darkMode)
}
darkButton.addEventListener("click", changeMode);
//version anterior
/* darkButton.addEventListener("click", () =>{
  const classArray = document.body.classList;
  darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";
  classArray.toggle("theme--dark");
}); */


document.getElementById('createButtom-img').addEventListener('click', createClick )
document.querySelector('.logo').addEventListener('click', logoClick )