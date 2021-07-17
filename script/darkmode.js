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
darkButton.addEventListener("click", () =>{
  const classArray = document.body.classList;
  darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";
  classArray.toggle("theme--dark");
});


document.getElementById('createButtom-img').addEventListener('click', createClick )
document.querySelector('.logo').addEventListener('click', logoClick )