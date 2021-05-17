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