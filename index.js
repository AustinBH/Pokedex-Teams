function getTrainer(id) {
  fetch(`http://localhost:3000/trainers/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      saveTeamInfo(json)
      getNav(json)
    })
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
  const main = document.querySelector('#main-wrapper')
  const div = document.createElement('div')

  div.className = 'card'

  div.addEventListener('mouseenter', () => pokemonInfo(pokemonObject, div))
  div.addEventListener('mouseleave', () => displayPokemonImage(pokemonObject, div))
  displayPokemonImage(pokemonObject, div)
  main.appendChild(div)
}

function pokemonInfo(pokemonObject, htmlElement) {
  console.log(pokemonObject)
  htmlElement.textContent = "";
  let name = document.createElement("h2");
      name.textContent = pokemonObject.name;
      name.className = 'pokemon-info'

  let ul = document.createElement('ul')
      ul.className = 'pokemon-info'

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

  let addPokemon = document.createElement("select")
  let defaultOption = document.createElement('option')
      defaultOption.textContent = 'Select a Team'
      addPokemon.add(defaultOption)

  for (team of TEAMS) {
    let option = document.createElement('option')
    option.textContent = team.name
    option.id = team.id
    addPokemon.appendChild(option)
  }

  addPokemon.addEventListener('change', () => {
    const teamName = event.target.value
    const team = TEAMS.find(team => team.name === teamName)
    createPokemonTeam(pokemonObject, team.id)
  })

  ul.appendChild(type)
  ul.appendChild(height)
  ul.appendChild(weight)
  ul.appendChild(pokedexEntry)

  htmlElement.appendChild(name)
  htmlElement.appendChild(ul)
  htmlElement.appendChild(showMore)
  htmlElement.appendChild(addPokemon)
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
  // header.textContent = ''  
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
    getNav(trainerObject)
    htmlElement.value = ''
    appendTeam(json, list, main)
  })
}

function listNavTeams(trainerObject){
  let teamList = document.getElementById("teams");

  let teams = trainerObject.teams

  for(team of teams) {
    displayNavTeams(team);
  }
}

function displayNavTeams(team){
  const main = document.querySelector('main')
  let teamList = document.getElementById("teams");
    let h4 = document.createElement("h4");
        h4.textContent = team.name;
        h4.id = team.id;

        h4.addEventListener("click", () => {
          closeNav();
          displayTeamInfo(team, main)
        })

        h4.addEventListener("mouseenter", () => {
          let pokemon = team.pokemon;
          let ul = document.createElement("ul");

          for (poke of pokemon){
            displayPokemon(poke, ul);
          }
          h4.appendChild(ul);
        })


        h4.addEventListener("mouseleave", () => {
          h4.children[0].remove();
        })

        teamList.appendChild(h4);
}

function displayPokemon(pokemonObject, htmlElement){
    let li = document.createElement("li");
      li.textContent = pokemonObject.name;

      li.addEventListener("click", () => {
        closeNav();
        showSinglePokemon(pokemonObject);
      })
    htmlElement.appendChild(li);
}

// function displaySinglePokemon(pokemonObject, teamObject, list)

// displayTeamInfo(teamObject, htmlElement)

function clearNavTeams(trainerObject){
  let teamList = document.getElementById("teams");

  teamList.textContent = "";
}

function getNav(trainerObject){
  clearNavTeams(trainerObject);
  listNavTeams(trainerObject);
}

const closeButton = document.querySelector(".closebtn");

  closeButton.addEventListener("click", () => {
    closeNav();
  })

  const hamSpan = document.querySelector("#ham-span");

    hamSpan.addEventListener("click", () => {
      openNav();
    })

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("hamburger-main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("hamburger-main").style.marginLeft= "0";
}


// const team1 = document.getElementById("team-1");

//   team1.addEventListener("mouseenter", () => {
//     dropDown();
//   })

//   team1.addEventListener("mouseleave", () => {
//     team1.firstElementChild.remove();
//   })



// function dropDown(){
//     // console.log(team1.children);
//     let team1 = document.getElementById("team-1");
//     let ul = document.createElement("ul");

//     let li1 = document.createElement("li");
//         li1.textContent = "pokemon 1";

//         li1.addEventListener("click", () => {
//           console.log("take me to the first page!")
//         })
    
//     let li2 = document.createElement("li");
//         li2.textContent = "pokemon 2";
        
//         li2.addEventListener("click", () => {
//           console.log("take me to the second page!")
//         })

//     ul.appendChild(li1);
//     ul.appendChild(li2);
//     team1.appendChild(ul);
// }