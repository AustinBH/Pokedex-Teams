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

function loginPage() {
  const head = document.querySelector("header");
  const main = document.querySelector('main')
  const img = document.querySelector("img");
  const newImage = document.createElement("img");
  const ham = document.querySelector('#hamburger-main')
  const nav = document.querySelector('#mySidenav')

    main.textContent = ''
    main.className = 'login'
    img.parentNode.removeChild(img);
    newImage.src = "https://fontmeme.com/permalink/190710/f87c04db0b54e3b89caa3d1d3ee405fb.png"
    newImage.id = "header-img"
    newImage.className = "login"
    ham.className = 'hidden'
    nav.className = 'hidden'
    head.appendChild(newImage);
  const wrapper = document.createElement("div")
    wrapper.className = "login"
  const form1 = document.createElement('form')
  const header1 = document.createElement('h2')
  const input1 = document.createElement('input')
  const input2 = document.createElement('input')
  const form2 = document.createElement('form')
    form2.className = "hidden"
  const header2 = document.createElement('h2')
  const input3 = document.createElement('input')
  const input4 = document.createElement('input')

  const signUpLink = document.createElement("p");
    signUpLink.textContent = "New Trainer?"

    const linkSpan = document.createElement("span");
      linkSpan.textContent = " Sign Up!"

      signUpLink.appendChild(linkSpan);
      

  form1.className = 'login'
  header1.textContent = 'Login'
  input1.setAttribute('type', 'text')
  input1.setAttribute("placeholder", "Enter Your Username")
  input2.setAttribute('type', 'submit')
  input2.value = 'Login'
  input2.className = 'submit'
  header2.textContent = 'Signup'
  input3.setAttribute('type', 'text')
  input4.setAttribute('type', 'submit')
  input3.setAttribute("placeholder", "Enter A Username")
  input4.value = 'Signup'
  input4.className = 'submit'

  form1.addEventListener('submit', () => {
    event.preventDefault()
    trainerLogin(event.target[0].value)
    main.className = ''
  })

  form2.addEventListener('submit', () => {
    event.preventDefault()
    trainerSignup(event.target[0].value)
    main.className = ''
  })

  linkSpan.addEventListener("click", () => {
        switchLoginForm(form2, form1)
        signUpLink.className = "hidden"
  })

  form1.appendChild(header1)
  form1.appendChild(input1)
  form1.appendChild(input2)
  form2.appendChild(header2)
  form2.appendChild(input3)
  form2.appendChild(input4)
  wrapper.appendChild(form1)
  wrapper.appendChild(form2)
  wrapper.appendChild(signUpLink)  
  main.appendChild(wrapper)
}

function switchLoginForm(show, hide){
  show.className = "login"

  hide.className = "hidden"

  const loginLink = document.createElement("p");
    loginLink.textContent = "Login";
    loginLink.style.cursor = "pointer"

    show.appendChild(loginLink);

    loginLink.addEventListener("click", () => {
      loginPage();
    })
}

function trainerLogin(username) {
  fetch('http://localhost:3000/trainers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    let user = json.find(el => {
      return el.username.toLowerCase() === username.toLowerCase()
    })
    if (user) {
        login(user)
    }
    else {
      displayErrorMessage("We could not find a trainer with that username!")
      loginPage()
    }
  })
}

function trainerSignup(username) {
  fetch('http://localhost:3000/trainers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })
  .then(res => res.json())
  .then(json => {
    if (!json.message) {
      login(json)
    }
    else {
      displayErrorMessage("That username is already taken!")
      loginPage()
    }
  })
}

function login(trainerObject) {
  const head = document.querySelector("header");
  const img = document.querySelector("img");
  const trainerName = document.querySelector('#trainer-name')
  const searchLabel = document.createElement("span");
  const searchForm = document.createElement("form");
  const typeInput = document.createElement("input");
  const typeSubmit = document.createElement("input");

    img.className = ""
    img.style.cursor = 'pointer'
    img.addEventListener('click', () => {
      getPokemon()
      getTrainer(TRAINER_ID)
    })

    trainerName.textContent = trainerObject.username
    searchLabel.className = "trainer"
    searchLabel.textContent = "Search By Name"
    searchForm.id = "search"
    typeInput.setAttribute("placeholder", "Search By Name")
    // typeInput.value = "Search By Name"
    typeInput.setAttribute("type", "text")
    typeSubmit.setAttribute("type", "submit")
    typeSubmit.setAttribute("value", "Search")
    searchForm.appendChild(searchLabel);
    searchForm.appendChild(typeInput);
    searchForm.appendChild(typeSubmit);

    searchForm.addEventListener("submit", () => {
      event.preventDefault()
      let input = `?name=${event.target[0].value}`
      getPokemon(input)
      searchForm.reset();
    })

  let spaceHolder = document.createElement("span");
    spaceHolder.id = "space-holder"
    head.appendChild(spaceHolder);
    head.appendChild(searchForm);

  localStorage.setItem('trainer_id', trainerObject.id)
  TRAINER_ID = trainerObject.id

  getTrainer(TRAINER_ID)
  getPokemon()
  addLogoutButton()

  const p = document.querySelector('p')
  p.addEventListener('click', () => {
    closeNav()
    displayTrainerInfo()
  })
}

function addLogoutButton() {
  const header = document.querySelector('header')
  const search = document.getElementById("search")
  const spaceHolder = document.getElementById("space-holder")
  const button = document.createElement("button")

  button.textContent = 'Logout'
  button.className = 'logout'
  header.appendChild(button)

  button.addEventListener('click', () => {
    header.removeChild(button)
    header.removeChild(spaceHolder);
    header.removeChild(search)
    localStorage.clear()
    loginPage()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loginPage()
})

function getPokemon(search = "") {
  const main = document.querySelector('#main-wrapper')
  main.textContent = ''
  fetch(`http:localhost:3000/pokemon${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    if (!json.message){
     for (pokemon of json)
      addPokemon(pokemon)
    } else {
      displayErrorMessage(json.message)
   }
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

        button.addEventListener('click', () => {
          let path = `?type=${button.textContent}`
          getPokemon(path)
        })

        htmlElement.appendChild(button)
  }
  return htmlElement
}

function addPokemonToTeam(pokemonObject) {
  let addPokemon = document.createElement("select")
  let defaultOption = document.createElement('option')
  const main = document.querySelector('main')
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
    if (team.pokemon.length > 5) {
      displayErrorMessage("Your team is full, please remove a pokemon before adding a new one!")
    }
    else {
      createPokemonTeam(pokemonObject, team.id)
    }
  })
  return addPokemon
}

function displayErrorMessage(message) {
  const errorWrapper = document.querySelector('#error-modal')
  const errorField = document.querySelector('#modal-message')
  const close = document.querySelector('.close')
  errorField.textContent = message
  errorWrapper.style.display = 'block'

  close.onclick = () => {
    errorWrapper.style.display = 'none'
  }

  window.onclick = function(event) {
    if (event.target == errorWrapper) {
      errorWrapper.style.display = 'none'
    }
  }

  setTimeout(() => {
    errorField.textContent = ''
    errorWrapper.style.display = 'none'
  }, 3000)
}

function showSinglePokemon(pokemonObject) {
  const main = document.querySelector('main')
  const showDiv = document.createElement('div')
  const pokedexEntry = document.createElement('p')
  const name = document.createElement('h1')
  const img = document.createElement('img')
  const types = document.createElement('ul')
  const descLabel = document.createElement('h3')
  const desc = document.createElement('p')
  const height = document.createElement('p')
  const weight = document.createElement('p')
  const addToTeam = addPokemonToTeam(pokemonObject)

  main.textContent = ''
  // main.className = 'show-page'
  if (pokemonObject.pokedex_number <= 10) {
      pokedexEntry.textContent = `#00${pokemonObject.pokedex_number}`
  }
  else if (pokemonObject.pokedex_number <= 100) {
    pokedexEntry.textContent = `#0${pokemonObject.pokedex_number}`
  }
  else {
    pokedexEntry.textContent = `#${pokemonObject.pokedex_number}`
  }

  showDiv.className = 'show-div'
  pokedexEntry.className = 'show'
  name.className = 'show'
  img.className = 'show'
  types.className = 'show'
  descLabel.className = 'show'
  height.className = 'show-data'
  weight.className = 'show-data'
  addToTeam.className = 'show'

  name.textContent = pokemonObject.name
  img.src = pokemonObject.img_url
  descLabel.textContent = "Description:"
  desc.textContent = pokemonObject.description
  height.textContent = `Height: ${pokemonObject.height} decimeters`
  weight.textContent = `Weight: ${pokemonObject.weight} hectograms`

  addPokemonTypes(pokemonObject, types)

  showDiv.appendChild(pokedexEntry)
  showDiv.appendChild(name)
  showDiv.appendChild(img)
  showDiv.appendChild(types)
  showDiv.appendChild(height)
  showDiv.appendChild(weight)
  showDiv.appendChild(descLabel)
  showDiv.appendChild(desc)
  showDiv.appendChild(addToTeam)
  main.appendChild(showDiv)
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
  .then(() => {
    displayErrorMessage(`${pokemonObject.name} added!`)
    getTrainer(TRAINER_ID)
  })
}

function displayPokemonImage(pokemonObject, htmlElement) {
  htmlElement.textContent = ''
  const name = document.createElement('h4')
  const pokedexEntry = document.createElement('h4')
  const img = document.createElement('img')

  name.textContent = pokemonObject.name
  name.className = 'front-name'
  if (pokemonObject.pokedex_number <= 10) {
      pokedexEntry.textContent = `#00${pokemonObject.pokedex_number}`
  }
  else if (pokemonObject.pokedex_number <= 100) {
    pokedexEntry.textContent = `#0${pokemonObject.pokedex_number}`
  }
  else {
    pokedexEntry.textContent = `#${pokemonObject.pokedex_number}`
  }
  pokedexEntry.className = 'front-name'
  img.src = pokemonObject.img_url

  htmlElement.appendChild(name)
  htmlElement.appendChild(img)
  htmlElement.appendChild(pokedexEntry)
}

function displayTrainerInfo() {
  fetch(`http://localhost:3000/trainers/${TRAINER_ID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(res => res.json())
  .then(json => {
    addTrainer(json)
  })
}

function addTrainer(trainerObject) {
  const trainerTeams = trainerObject.teams
  const main = document.querySelector('main')
    // main.className = "team-show-page"

  const div = document.createElement('div')
    div.className = "teams-div"
  const name = document.createElement('h2')
    name.className = "show"
  const teams = document.createElement('ul')
    teams.className = "show-team-list"
  const form = document.createElement('form')
    form.className = "show"
  const input1 = document.createElement('input')
  const input2 = document.createElement('input')

  const liLabel = document.createElement("li");
    liLabel.textContent = "Teams:"
    liLabel.className = "team-label"

    teams.appendChild(liLabel);

  name.textContent = trainerObject.username
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
    li.className = "show"
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
  htmlElement.style.display = "grid"

  const div = document.createElement("div");
    div.className = "teams-div"

  const pokemonList = document.createElement('ul')
  pokemonList.className = "show-team-list";

  const listLabel = document.createElement("li");
    listLabel.textContent =`${teamObject.name}: `
    pokemonList.appendChild(listLabel);
  const teamPokemon = teamObject.pokemon
  for (pokemon of teamPokemon) {
    displaySinglePokemon(pokemon, teamObject, pokemonList)
  }
  div.appendChild(pokemonList);
  htmlElement.appendChild(div)
}

function displaySinglePokemon(pokemonObject, teamObject, list) {
  const li = document.createElement('li')
    li.className =  "team-list-pokemon";

  const pokemonName = document.createElement('span')
  const button = document.createElement('button')
  pokemonName.textContent = pokemon.name
  button.textContent = 'Delete'
  button.className = 'delete-button'

  pokemonName.addEventListener("click", () => {
    showSinglePokemon(pokemonObject);
  })

  button.addEventListener('click', () => {
    deletePokemonFromTeam(pokemonObject, teamObject, li)
    getTrainer(TRAINER_ID)
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
    getTrainer(TRAINER_ID)
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
    let span = document.createElement('span')
        span.textContent = team.name;
        h4.id = team.id;
        h4.appendChild(span)

    let deleteFromNav = document.createElement("span")
        deleteFromNav.textContent = "×"
        deleteFromNav.id = "delete-nav"
        h4.appendChild(deleteFromNav)

        span.addEventListener("click", () => {
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
          h4.children[2].remove();
        })

        teamList.appendChild(h4);

        deleteFromNav.addEventListener("click", () => {
          deleteTeam(team, h4)
        })
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

function clearNavTeams(trainerObject){
  let teamList = document.getElementById("teams");
  teamList.textContent = "";
}

function getNav(trainerObject){
  const ham = document.querySelector('#hamburger-main')
  const nav = document.querySelector('#mySidenav')

  ham.className = ''
  nav.className = 'sidenav'
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
