document.addEventListener('DOMContentLoaded', main())

function main() {
  fetch('http:localhost:3000/pokemon/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    addPokemon(json)
  })
}

function addPokemon(pokemonObject) {
  const div = document.querySelector('#test')
  const h1 = document.createElement('h1')
  const img = document.createElement('img')
  h1.textContent = pokemonObject.name
  img.src = pokemonObject.img_url

  div.appendChild(img)
  div.appendChild(h1)
}
