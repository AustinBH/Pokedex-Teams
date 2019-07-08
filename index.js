document.addEventListener('DOMContentLoaded', () => {
  getPokemon()
  addTrainerButton()
})

function getPokemon() {
  fetch('http:localhost:3000/pokemon', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    for (pokemon of json)
    addPokemon(pokemon)
    console.log(json)
  })
}

function addPokemon(pokemonObject) {
  const main = document.querySelector('#main-wrapper')
  const div = document.createElement('div')

  div.className = 'card'

  div.addEventListener('mouseenter', () => pokemonInfo(pokemonObject, div))
  div.addEventListener('mouseleave', () => displayPokemonImage(pokemonObject, div))
  displayPokemonImage(pokemonObject, div)
  main.appendChild(div)
}

function pokemonInfo(pokemonObject, htmlElement) {
  htmlElement.textContent = "";
  let name = document.createElement("h2");
      name.textContent = pokemonObject.name;
      name.className = 'pokemon-info'

  let ul = document.createElement('ul')
      ul.className = 'pokemon-info'

  let desc = document.createElement("li");
      desc.textContent = `Description: ${pokemonObject.description}`;

  let type = document.createElement("li");
      type.textContent = `Type: ${pokemonObject.pokemon_type}`;

  let height = document.createElement("li");
      height.textContent = `Height: ${pokemonObject.height}`;

  let weight = document.createElement("li");
      weight.textContent = `Weight ${pokemonObject.weight}`;

  let pokedexEntry = document.createElement('li');
      pokedexEntry.textContent = `Pokedex Entry: ${pokemonObject.pokedex_number}`

  let showMore = document.createElement("button");
      showMore.textContent = "Show More"
      showMore.className = 'in-line-buttons'

  let addPokemon = document.createElement("button");
      addPokemon.textContent = "Add to Team"
      addPokemon.className = 'in-line-buttons'

  ul.appendChild(type)
  ul.appendChild(height)
  ul.appendChild(weight)
  ul.appendChild(pokedexEntry)

  htmlElement.appendChild(name)
  htmlElement.appendChild(ul)
  htmlElement.appendChild(showMore)
  htmlElement.appendChild(addPokemon)
}

function displayPokemonImage(pokemonObject, htmlElement) {
  htmlElement.textContent = ''
  const name = document.createElement('h4')
  const pokedexEntry = document.createElement('h4')
  const img = document.createElement('img')

  name.textContent = pokemonObject.name
  name.className = 'front-name'
  pokedexEntry.textContent = `Pokedex Entry: ${pokemonObject.pokedex_number}`
  pokedexEntry.className = 'front-name'
  img.src = pokemonObject.img_url

  htmlElement.appendChild(name)
  htmlElement.appendChild(pokedexEntry)
  htmlElement.appendChild(img)
}

function addTrainerButton() {
  const header = document.querySelector('header')
  const menu = document.createElement('nav')
  header.appendChild(menu)
}
