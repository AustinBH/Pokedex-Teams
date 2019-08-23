# Pokedex Teams

## Setup

  * This Github Repository can be cloned down onto your local machine and you can use the application by opening the index.html file in your browser.
    - If you download this repository you will also need to download the [backend repository](https://github.com/AustinBH/Pokedex-backend/tree/master).
        - The CORS origins that are currently allowed through our hosted API do not allow requests outside of the hosted site.
        - You can change the cors origins in your local version of the backend and then access the application using the index.html page.
  * You can also visit the [Site](https://austinbh.github.io/Pokedex-Teams/) where it is currently hosted.

## Using the application

  * This application supports user accounts.
    - You can login and create a new account on the landing page
    - Once you have an account, your team information will persist when you logout
    - Reloading the page will require you to login again
  * As a trainer you can create new teams, add pokemon to your teams, remove pokemon from those teams, and delete teams.
    - Creating Teams
      - If you are viewing the application in a window that is at least 1350 pixels then there is a button in the upper right hand corner of the page which allows you to create a new team.
      - You can also access your teams page by clicking on the hamburger menu and then clicking on "Teams"
    - Adding Pokemon
      - You can add pokemon to your teams directly from the main index page.
      - You can also add pokemon to your teams from a specific pokemon's view page.
    - Removing Pokemon
      - You can remove individual pokemon from a specific team page.
      - There is a delete button to the right of the pokemon's name which will remove that pokemon from that team.
    - Deleting Teams
      - You can delete your teams from the main teams view page (The page where you create your teams).
      - You can also delete teams directly from the menu accessed using the hamburger at the top of the screen.
  * We currently support all 807 pokemon up to the generation 7 games except for Meltan and Melmetal.
  * There are also 3 different ways that you can filter the pokemon displayed on the main page.
    - Name
      - There is a Name Search field at the top of the page which lets you search for pokemon by name
      - This search field does not require an exact match, searching for "char" will display all pokemon with char in their name
    - Generation
      - There is a Generation select menu at the top of the page
      - This will display all pokemon specific to the generation that you select
    - Type
      - By clicking on a pokemon's type, you can display all pokemon of that type
      - The type buttons work from both the main landing page as well as from the individual pokemon pages

## Contributors

  * Both the front and backends of this project were built by [Noah Fairbairn](https://github.com/NFairbairn) and [Austin Harlow](https://github.com/AustinBH).
  * The data that we used for this project is from the [PokeApi](https://pokeapi.co/) for all of the pokemon information and [The Pokemon Website](https://www.pokemon.com/us/) for all of the pokemon images.
