document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/pups')
  .then(r => r.json())
  //.then(pupsArray => console.log(pupsArray))
  .then(pupsArray => pupsArray.forEach(pup => renderPupsInBar(pup)))
  
  let dogBar = document.getElementById('dog-bar')
  
  function renderPupsInBar(pup) {
    let span = document.createElement('span')
    span.textContent = `${pup.name}`
    //console.log(pup.name)
    dogBar.appendChild(span)
    span.addEventListener('click', () => renderPupInDom(pup))
  }

  let div = document.getElementById('dog-info')

  function renderPupInDom(pup) {
    div.innerHTML = ''
    let h2 = document.createElement('h2')
    h2.textContent = pup.name
    //console.log(pup)
    let img = document.createElement('img')
    img.src = pup.image
    let btn = document.createElement('button')
    btn.textContent = pup.isGoodDog? 'Good dog' : 'Bad dog'
    div.append(img, h2, btn)
    btn.addEventListener ('click', () => changeStatus(pup.id, pup.isGoodDog))
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
    .then(pup => renderPupInDom(pup))
  }

  // Filter dogs and toggle btn on/off

  fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(pupsArray => filterDogs(pupsArray))
  
  function filterDogs(pupsArray) {
    let goodPupsArray = pupsArray.filter(pup => pup.isGoodDog == true)
    //console.log(pupsArray)
    //console.log(goodPupsArray)
    let filterBtn = document.getElementById('good-dog-filter')
    filterBtn.addEventListener('click', () => { 
      if (filterBtn.textContent == 'Filter good dogs: OFF') { 
        filterBtn.textContent = 'Filter good dogs: ON'
        dogBar.innerHTML = ''
        div.innerHTML = ''
        goodPupsArray.forEach(goodPup => renderPupsInBar(goodPup))
      } 
      else {
        filterBtn.textContent ='Filter good dogs: OFF'
        dogBar.innerHTML = ''
        div.innerHTML = ''
        pupsArray.forEach(pup => renderPupsInBar(pup))
      } 
    })
  }
})