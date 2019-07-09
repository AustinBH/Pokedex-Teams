function getTrainer(id) {
  fetch(`http://localhost:3000/trainers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => saveTeamInfo(json))
}

function saveTeamInfo(trainerObject) {
  // Assigning global variable to represent all teams
  TEAMS = trainerObject.teams
}

document.addEventListener('DOMContentLoaded', () => {
  TRAINER_ID = document.cookie = 'trainer_id=4'
  getTrainer(TRAINER_ID.slice(-1))
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
  const main = document.querySelector('main')
  const div = document.createElement('div')

  main.className = 'main-wrapper'
  div.className = 'card'

  div.addEventListener('mouseenter', () => pokemonInfo(pokemonObject, div))
  div.addEventListener('mouseleave', () => displayPokemonImage(pokemonObject, div))
  displayPokemonImage(pokemonObject, div)
  main.appendChild(div)
}

function pokemonInfo(pokemonObject, htmlElement) {
  console.log(pokemonObject.description)
  htmlElement.textContent = "";
  let name = document.createElement("h2");
      name.textContent = pokemonObject.name;
      name.className = 'pokemon-info'

  let ul = document.createElement('ul')
      ul.className = 'pokemon-info'

  let type = document.createElement("li")
      addPokemonTypes(pokemonObject, type)

  let height = document.createElement("li");
      height.textContent = `Height: ${pokemonObject.height}`;

  let weight = document.createElement("li");
      weight.textContent = `Weight ${pokemonObject.weight}`;

  let pokedexEntry = document.createElement('li');
      pokedexEntry.textContent = `Pokedex Entry: ${pokemonObject.pokedex_number}`

  let showMore = document.createElement("button");
      showMore.textContent = "Show More"
      showMore.className = 'in-line-buttons'

  showMore.addEventListener('click', () => {
    showSinglePokemon(pokemonObject)
  })

  ul.appendChild(type)
  ul.appendChild(height)
  ul.appendChild(weight)
  ul.appendChild(pokedexEntry)

  htmlElement.appendChild(name)
  htmlElement.appendChild(ul)
  htmlElement.appendChild(showMore)
  htmlElement.appendChild(addPokemonToTeam(pokemonObject))
}

function addPokemonTypes(pokemonObject, htmlElement) {
  const pokemonTypes = pokemonObject.pokemon_type.split(" ").filter(el => el != "")
  for (singleType of pokemonTypes) {
    let button = document.createElement('button')
        button.textContent = singleType
        button.className = singleType
        htmlElement.appendChild(button)
  }
  return htmlElement
}

function addPokemonToTeam(pokemonObject) {
  let addPokemon = document.createElement("select")
  let defaultOption = document.createElement('option')
      defaultOption.textContent = 'Add to a Team'
      addPokemon.add(defaultOption)

  for (team of TEAMS) {
    let option = document.createElement('option')
    option.textContent = team.name
    addPokemon.appendChild(option)
  }

  addPokemon.addEventListener('change', () => {
    const teamName = event.target.value
    const team = TEAMS.find(team => team.name === teamName)
    createPokemonTeam(pokemonObject, team.id)
  })

  return addPokemon
}

function showSinglePokemon(pokemonObject) {
  const main = document.querySelector('main')
  const h1 = document.createElement('h1')
  const img = document.createElement('img')
  const descLabel = document.createElement('h3')
  const desc = document.createElement('p')
  const height = document.createElement('p')
  const weight = document.createElement('p')


  main.textContent = ''
  main.className = 'show-page'
  h1.textContent = pokemonObject.name
  img.src = pokemonObject.img_url
  descLabel.textContent = "Description:"
  desc.textContent = pokemonObject.description
  height.textContent = `Height: ${pokemonObject.height} decimeters`
  weight.textContent = `Weight: ${pokemonObject.weight} hectograms`

  main.appendChild(h1)
  main.appendChild(img)
  main.appendChild(descLabel)
  main.appendChild(desc)
  main.appendChild(height)
  main.appendChild(weight)
  main.appendChild(addPokemonToTeam(pokemonObject))
}

function createPokemonTeam(pokemonObject, teamId) {
  fetch('http://localhost:3000/pokemon_teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      team_id: teamId,
      pokemon_id: pokemonObject.id
    })
  })
  .then(alert(`${pokemonObject.name} added!`))
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
  htmlElement.appendChild(img)
  htmlElement.appendChild(pokedexEntry)
}

function addTrainerButton() {
  const header = document.querySelector('header')
  const button = document.createElement('button')
  header.textContent = ''
  button.textContent = 'Trainer Info'

  button.addEventListener('click', () => displayTrainerInfo(1))
  header.appendChild(button)
}

function displayTrainerInfo() {
  fetch(`http://localhost:3000/trainers/${TRAINER_ID.slice(-1)}`, {
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
  const div = document.createElement('div')
  const name = document.createElement('h2')
  const teams = document.createElement('ul')
  const form = document.createElement('form')
  const input1 = document.createElement('input')
  const input2 = document.createElement('input')
  name.textContent = trainerObject.username
  teams.textContent = 'Teams:'
  input1.setAttribute('type', 'text')
  input2.setAttribute('type', 'submit')
  input2.value = 'Create new team'
  for (team of trainerTeams) {
    appendTeam(team, teams, main)
  }

  form.addEventListener('submit', () => {
    event.preventDefault()
    createNewTeam(input1, trainerObject)
  })

  main.textContent = ''
  form.appendChild(input1)
  form.appendChild(input2)
  div.appendChild(name)
  div.appendChild(teams)
  div.appendChild(form)
  main.appendChild(div)
}

function appendTeam(teamObject, list, htmlElement) {
  const li = document.createElement('li')
  const teamName = document.createElement('span')
  const button = document.createElement('button')
  button.textContent = 'Delete'
  button.className = 'delete-button'
  teamName.textContent = teamObject.name

  teamName.addEventListener('click', () => displayTeamInfo(teamObject, htmlElement))
  button.addEventListener('click', () => deleteTeam(teamObject, li))

  li.appendChild(teamName)
  li.appendChild(button)
  list.appendChild(li)
}

function displayTeamInfo(teamObject, htmlElement) {
  htmlElement.textContent = ''

  const pokemonList = document.createElement('ul')
  pokemonList.textContent = `${teamObject.name}: `
  const teamPokemon = teamObject.pokemon
  for (pokemon of teamPokemon) {
    displaySinglePokemon(pokemon, teamObject, pokemonList)
  }
  htmlElement.appendChild(pokemonList)
}

function displaySinglePokemon(pokemonObject, teamObject, list) {
  const li = document.createElement('li')
  const pokemonName = document.createElement('span')
  const button = document.createElement('button')
  pokemonName.textContent = pokemon.name
  button.textContent = 'Delete'
  button.className = 'delete-button'

  button.addEventListener('click', () => {
    deletePokemonFromTeam(pokemonObject, teamObject, li)
  })

  li.appendChild(pokemonName)
  li.appendChild(button)
  list.appendChild(li)
}

function deletePokemonFromTeam(pokemonObject, teamObject, htmlElement) {
  fetch(`http://localhost:3000/pokemon_teams`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
        team_id: teamObject.id,
        pokemon_id: pokemonObject.id
    })
  })
  .then(htmlElement.parentNode.removeChild(htmlElement))
}

function deleteTeam(teamObject, htmlElement) {
  fetch(`http://localhost:3000/teams/${teamObject.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(htmlElement.parentNode.removeChild(htmlElement))
}

function addBackButton() {
  const main = document.querySelector('#main-wrapper')
  const header = document.querySelector('header')
  const button = document.createElement('button')
  button.textContent = 'Go Back'

  button.addEventListener('click', () => {
    getPokemon()
    getTrainer(TRAINER_ID.slice(-1))
  })
  header.appendChild(button)
}

function createNewTeam(htmlElement, trainerObject) {
  const main = document.querySelector('main')
  const list = document.querySelector('ul')
  fetch('http:localhost:3000/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: htmlElement.value,
      trainer_id: trainerObject.id
    })
  })
  .then(res => res.json())
  .then(json => {
    htmlElement.value = ''
    appendTeam(json, list, main)
  })
}
