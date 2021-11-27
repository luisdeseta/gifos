//Boton crear Gifo

const createClick = () =>{
  window.location = "/pages/create.html"
}
// Logo
const logoClick = () =>{
  window.location = "../index.html"
}

//Constantes para darkmode
let darkModeStatus = localStorage.getItem("darkmode");
const darkButton = document.getElementById("darkSwitch");
const classArray = document.body.classList;

/**
 * @description Activa darkMode y guarda en Localstorage
 *  
 */
const enableDarkMode = ()=>{
  //agrego la clase
  document.body.classList.add("theme--dark");
  //guardo el dato en localStorage
  localStorage.setItem("darkmode", "enabled");
  darkButton.innerText = "Modo Diurno";  
}
/**
 * @description Desactiva darkMode y guarda en Localstorage
 *  
 */
 const disableDarkMode = ()=>{
  //agrego la clase
  document.body.classList.remove("theme--dark");
  //guardo el dato en localStorage
  localStorage.setItem("darkmode", null);
  darkButton.innerText = "Modo Nocturno";  
}

//verfico el status de DarkMode, si en LS quedo gaurdado "enabled", activo el darkmode
if (darkModeStatus === 'enabled') {
  enableDarkMode();
}

/**
 * @description Verifico el estado de DarkMode y activo o desactivo
 * el modo.
 */
 darkButton.addEventListener("click", ()=>{
  //capturo valor guardado en LS
  darkModeStatus = localStorage.getItem("darkmode");

  if (darkModeStatus !== "enabled") {
    enableDarkMode()
    
  } else {
    disableDarkMode()
    
  }

})


document.getElementById('createButtom-img').addEventListener('click', createClick )
document.querySelector('.logo').addEventListener('click', logoClick )