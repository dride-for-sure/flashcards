
<p align=center>
  <img src="logo.png"/>
</p>

<h1 align=center>
MORTAL CODING COMBAT
</h1>

<p align=center><i>A multiplayer realtime flashcard game about various tech topics</i></p>

<p align=center>
  <img alt="Status Beta" src="https://img.shields.io/badge/Status-Beta-green.svg?style=flat"/>  <img alt="MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>  <img alt="React" src="https://img.shields.io/badge/-React-blue?logo=react&style=flat"/>  <img alt="Java" src="https://img.shields.io/badge/-Java-brown?logo=java&style=flat"/>  <img alt="Spring" src="https://img.shields.io/badge/-Spring-lightgrey?logo=spring&style=flat"/>  <img alt="Docker" src="https://img.shields.io/badge/-Docker-grey?logo=docker&style=flat"/>  <img alt="MongoDb" src="https://img.shields.io/badge/-MongoDb-yellow?logo=mongodb&style=flat"/>
</p>

**MORTAL CODING COMBAT** is a multiplayer flashcard game written in java with spring boot, websocks over sockjs and a react frontend for a bootcamp I participated. It features various topics from Java over JS & React against which players can measure themselves and also each other.

### Features
- Registration-free multiplayer flashcard game 
- Handling gamestates with stomp over stockjs websockets
- Flashcards of various topics from Java to React
- Possibility to open multiple games in parallel
- Live in-game player stats
- Dockerfile to deploy on Heroku
- *(In Progress) Admin login to edit list of questions etc. pp.*
- *(In Progress) Unit- & Integrationstests*

### Contributing

**MORTAL CODING COMBAT** is an open source project and contributions of any kind are welcome and highly appreciated. Issues, bugs and feature requests are all listed on the [issues](/issues) page. Feel free to open a ticket and make feature requests. Have a look at the [CONTRIBUTING](CONTRIBUTING.md) to learn about the common style guide and project structure.

#### Local Development

Clone the git repository and install the frontend within the `frontend/` folder via `npm`:

```
git clone git@github.com:dride-for-sure/mortal-coding-combat.git
cd mortal-coding-combat/frontend
npm i
```

To run the development server use:

```
npm start
```

To install the backend use `maven` and launch a local development server with the help of `spring`.

#### Seed data

To seed a local test environment mongodb instance please use the `seed.js` (Upcoming).

### License

**MORTAL CODING COMBAT** ist an open source project under the [MIT License](LICENSE.md)

Happy coding! :metal:
