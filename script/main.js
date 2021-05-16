/**dark theme button*/
const darkButton = document.getElementById("darkSwitch");

darkButton.addEventListener("click", () =>{
    const classArray = document.body.classList;
    darkButton.innerText = classArray.contains("theme--dark") ? "Modo Nocturno" : "Modo Diurno";
    classArray.toggle("theme--dark");
});

//que poner en el reject?

const apiKey = "JO9qaDVGDEpF16a1uNsl7AEUnAjD9Yed"  //${apiKey}
//console.log(data.data[0].images.original.url))
const test = () =>{
  return new Promise((resolve, reject)=>
  fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => 
      document.querySelector(".trendingText").innerHTML =
      `
      <img src="${data.data[0].images.original.url}" alt="test1">
      
      `
      )
  
  )};

//busqueda
// autocompletado

const searchFill = () =>{
  return new Promise((resolve, reject)=>
  fetch(`http://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&limit=4`)
  .then(response => response.json())
  .then(data => console.log(data))
  //console.log(dat)
  )
}


const inputListener = document.querySelector("#searchBox");
const inputTiping = (i) =>{
  if (i.charCode != "") {
    
    
  }
}