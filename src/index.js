document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/pups')
  .then(r => r.json())
  //.then(pups => console.log(pups))
  .then(pups => pups.forEach(pup => renderPup(pup)))
  
  function renderPup(pup) {
    let span = document.createElement('span')
    span.textContent = `${pup.name}`
    span.className = ('like-dog')
    //console.log(pup.name)
    let dogBar = document.getElementById('dog-bar')
    dogBar.appendChild(span)
  }
  let dogButton = document.getElementsByClassName("like-dog");
  console.log(dogButton)
  dogButton.forEach(btn => {
    btn.addEventListener("click", (e) => console.log( e.target.id ))
     })
  
  
  

})