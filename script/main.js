/**dark theme button*/
const darkButton = document.getElementById("darkSwitch");

darkButton.addEventListener("click", () =>{
    const classArray = document.body.classList;
    darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";
    classArray.toggle("theme--dark");
});
