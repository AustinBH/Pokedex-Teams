document.addEventListener('DOMContentLoaded', () => {
  getPokemon()
  addTrainerButton()
  addBackButton()

})

function getPokemon() {
  const main = document.querySelector('#main-wrapper')
  main.textContent = ''
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
  const button = document.createElement('button')
  header.textContent = ''
  button.textContent = 'Trainer Info'

  button.addEventListener('click', displayTrainerInfo)
  header.appendChild(button)
}

function displayTrainerInfo() {
  fetch('http://localhost:3000/trainers/4', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => addTrainer(json))
}

function addTrainer(trainerObject) {
  const trainerTeams = trainerObject.teams
  const main = document.querySelector('main')
  const name = document.createElement('h2')
  const teams = document.createElement('ul')
  name.textContent = trainerObject.username
  teams.textContent = 'Teams:'
  for (team of trainerTeams) {
    appendTeam(team, teams, main)
  }
  main.textContent = ''
  main.appendChild(name)
  main.appendChild(teams)
}

function appendTeam(teamObject, list, htmlElement) {
  const teamName = document.createElement('li')
  teamName.textContent = teamObject.name
  teamName.addEventListener('click', () => displayTeamInfo(teamObject, htmlElement))
  list.appendChild(teamName)
}

function displayTeamInfo(teamObject, htmlElement) {
  htmlElement.textContent = ''

  const pokemonList = document.createElement('ul')
  pokemonList.textContent = `${teamObject.name}: `
  const teamPokemon = teamObject.pokemon
  for (pokemon of teamPokemon) {
    let pokemonName = document.createElement('li')
    pokemonName.textContent = pokemon.name
    pokemonList.appendChild(pokemonName)
  }
  htmlElement.appendChild(pokemonList)
}

function addBackButton() {
  const main = document.querySelector('#main-wrapper')
  const header = document.querySelector('header')
  const button = document.createElement('button')
  button.textContent = 'Go Back'

  button.addEventListener('click', getPokemon)
  header.appendChild(button)
}
