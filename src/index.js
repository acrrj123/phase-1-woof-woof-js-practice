document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/pups')
  .then(r => r.json())
  //.then(pups => console.log(pups))
  .then(pups => pups.forEach(pup => renderPups(pup)))
  
  
  function renderPups(pup) {
    let span = document.createElement('span')
    span.textContent = `${pup.name}`
    //console.log(pup.name)
    let dogBar = document.getElementById('dog-bar')
    dogBar.appendChild(span)

    span.addEventListener('click', () => fetchOnePup(pup))
  }

  function fetchOnePup(pup) {
    let div = document.getElementById('dog-info')
    div.innerHTML = ""
    let h2 = document.createElement('h2')
    h2.textContent = pup.name
    //console.log(pup)
    let img = document.createElement('img')
    img.src = pup.image
    let btn = document.createElement('button')
    btn.textContent = pup.isGoodDog? 'Good dog' : 'Bad dog'
    div.append(img, h2, btn)

    btn.addEventListener ('click', () => {
      changeStatus(pup.id, pup.isGoodDog)
    })
  }

  function changeStatus(id, isGoodDog) {
    fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({isGoodDog: !isGoodDog})
    })
    .then(resp => resp.json())
    .then(dogInfo => {
      fetchOnePup(dogInfo)
    })
  }

  let filterBtn = document.getElementById('good-dog-filter')
  filterBtn.addEventListener('click', e => toggleOnOff())
  
  function toggleOnOff(e) {
    if (filterBtn.textContent == 'Filter good dogs: OFF') { 
      filterBtn.textContent = 'Filter good dogs: ON'
      //renderGoodDogs()
    } 
    else {
      filterBtn.textContent ='Filter good dogs: OFF'
    }  
  }
})