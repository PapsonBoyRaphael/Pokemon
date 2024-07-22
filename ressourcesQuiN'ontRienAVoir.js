Skip to content
Sign in
Sign up
Instantly share code, notes, and snippets.

codeursenior/00.Apprendre NodeJS : Extraits de code
Last active 2 months ago
Clone this repository at &lt;script src=&quot;https://gist.github.com/codeursenior/d8f2ac304112ea8caea93591e999ac33.js&quot;&gt;&lt;/script&gt;
<script src="https://gist.github.com/codeursenior/d8f2ac304112ea8caea93591e999ac33.js"></script>
Code
Revisions
3
Stars
9
Apprendre NodeJS : Extraits de code
00.Apprendre NodeJS : Extraits de code
Apprendre NodeJS : Extraits de code 
01.app.js
const express = require('express')
  
const app = express()
const port = 3000
  
app.get('/', (req, res) => res.send('Hello, Express!'))
  
app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
02.mock-pokemon.js
const pokemons = [
 {
  id: 1,
  name: "Bulbizarre",
  hp: 25,
  cp: 5,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
  types: ["Plante", "Poison"],
  created: new Date()
 },
 {
  id: 2,
  name: "Salamèche",
  hp: 28,
  cp: 6,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
  types: ["Feu"],
  created: new Date()
 },
 {
  id: 3,
  name: "Carapuce",
  hp: 21,
  cp: 4,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
  types: ["Eau"],
  created: new Date()
 },
 {
  id: 4,
  name: "Aspicot",
  hp: 16,
  cp: 2,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
  types: ["Insecte", "Poison"],
  created: new Date()
 },
 {
  id: 5,
  name: "Roucool",
  hp: 30,
  cp: 7,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
  types: ["Normal", "Vol"],
  created: new Date()
 },
 {
  id: 6,
  name: "Rattata",
  hp: 18,
  cp: 6,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
  types: ["Normal"],
  created: new Date()
 },
 {
  id: 7,
  name: "Piafabec",
  hp: 14,
  cp: 5,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png",
  types: ["Normal", "Vol"],
  created: new Date()
 },
 {
  id: 8,
  name: "Abo",
  hp: 16,
  cp: 4,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png",
  types: ["Poison"],
  created: new Date()
 },
 {
  id: 9,
  name: "Pikachu",
  hp: 21,
  cp: 7,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
  types: ["Electrik"],
  created: new Date()
 },
 {
  id: 10,
  name: "Sabelette",
  hp: 19,
  cp: 3,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png",
  types: ["Normal"],
  created: new Date()
 },
 {
  id: 11,
  name: "Mélofée",
  hp: 25,
  cp: 5,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
  types: ["Fée"],
  created: new Date()
 },
 {
  id: 12,
  name: "Groupix",
  hp: 17,
  cp: 8,
  picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
  types: ["Feu"],
  created: new Date()
 }
];
  
module.exports = pokemons
03.helper.js
const success = (message, data) => {
  return {
    message: message,
    data: data
  }
}
 
exports.success
04.app.js
/* Les réponses JSON (Correction) : Retourner une liste de données au format JSON */

const express = require('express')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon')
 
const app = express()
const port = 3000
 
app.get('/', (req,res) => res.send('Hello again, Express !'))
 
// On retourne la liste des pokémons au format JSON, avec un message :
app.get('/api/pokemons', (req, res) => {
  const message = 'La liste des pokémons a bien été récupérée.'
  res.json(success(message, pokemons)) 
})
 
app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokémon a bien été trouvé.'
  res.json(success(message, pokemon))
})
 
app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
05.app.js
/* Une API Rest Complète : Ajouter un nouveau Pokémon */
//...
  
app.post('/api/pokemons', (req, res) => {
  const id = 123
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})
  
// ...
06.helper.js
exports.success = (message, data) => {
  return { message, data }
}

exports.getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map(pokemon => pokemon.id)
  const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b))
  const uniqueId = maxId + 1
    
  return uniqueId
}
07.request-post-with-insomnia.json
{
  "name": "Chenipan",
  "hp": 29,
  "cp":4,
  "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/010.png",
  "types": ["Insecte", "Poison"]
 }
08.app.js
/* Une API Rest Complète : Modifier un Pokémon */
// ...
 
app.put('/api/pokemons/:id', (req, res) => {
 const id = parseInt(req.params.id);
 const pokemonUpdated = { ...req.body, id: id }
 pokemons = pokemons.map(pokemon => {
  return pokemon.id === id ? pokemonUpdated : pokemon
 })
  
 const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
 res.json(success(message, pokemonUpdated))
});
 
// ...
09.app.js
/* Une API Rest Complète : Supprimer un Pokémon */
// ...
 
app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
  res.json(success(message, pokemonDeleted))
});
 
// ...
10.src>models>pokemon.js
/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
11.sequelize.js
/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
  
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon
}
12.findAllPokemons.js
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}
13.findPokemonByPk.js
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
  })
}
14.createPokemon.js
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        res.json({ message, data: pokemon })
      })
  })
}
15.updatePokemon.js
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Pokemon.findByPk(id).then(pokemon => {
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
  })
}
16.deletePokemon.js
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      const pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
    })
  })
}
17.models>user.js
/* Authentification : Créer un modèle User avec Sequelize */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  })
}
18.routes>login.js
/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(isPasswordValid) {
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user })
        }
      })
    })
  })
}
19.auth>auth.js
/* Authentification : Créer un modèle User avec Sequelize */
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}
20.javascript>index.js
// Step 1 : "Hello, Heroku ! 👋"
fetch("https://cryptic-sands-41262.herokuapp.com/")
  .then((res) => res.json())
  .then((res) => console.log(res));

// Step 2 : "Get JWT token 🔓"
fetch("https://cryptic-sands-41262.herokuapp.com/api/login", {
  method: "POST",
  body: JSON.stringify({ username: "pikachu", password: "pikachu" }),
  headers: { "Content-type": "application/json" }
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.token;
  })
  .then((token) => fetchPokemonlist(token));

// Step 3 : "Get pokemon list 🎉"
const fetchPokemonlist = (token) => {
  fetch("https://cryptic-sands-41262.herokuapp.com/api/pokemons", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
21.angular>app.component.ts
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { tap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Step 1 : "Hello, Heroku ! 👋"
    this.http
      .get("https://cryptic-sands-41262.herokuapp.com/")
      .subscribe((res) => console.log(res));

    // Step 2 : "Get JWT token 🔓"
    this.http
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        this.httpOptions
      )
      .pipe(
        tap((res) => console.log(res)),
        switchMap((res) => this.fetchPokemonlist(res.token))
      )
      .subscribe((res) => console.log(res));
  }

  // Step 3 : "Get pokemon list 🎉"
  fetchPokemonlist(token: string) {
    const httpOptionsWithJWT = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

    return this.http.get(
      "https://cryptic-sands-41262.herokuapp.com/api/pokemons",
      httpOptionsWithJWT
    );
  }
}
22.react>App.js
import React, { useEffect } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  useEffect(() => {
    // Step 1 : "Hello, Heroku ! 👋"
    axios
      .get("https://cryptic-sands-41262.herokuapp.com")
      .then((res) => console.log(res.data));

    // Step 2 : "Get JWT token 🔓"
    axios
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return res.token;
      })
      .then((token) => fetchPokemonlist(token));
  }, []);

  // Step 3 : "Get pokemon list 🎉"
  const fetchPokemonlist = (token) => {
    return axios
      .get("https://cryptic-sands-41262.herokuapp.com/api/pokemons", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => res.data)
      .then((res) => console.log(res));
  };

  return (
    <div className="App">
      <h1>Hello, Heroku ! 👋</h1>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
        alt="React Logo"
        width="300"
      />
    </div>
  );
};

export default App;
23.vuejs>HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    // Step 1 : "Hello, Heroku ! 👋"
    axios
      .get("https://cryptic-sands-41262.herokuapp.com")
      .then((res) => console.log(res.data));
    // Step 2 : "Get JWT token 🔓"
    axios
      .post(
        "https://cryptic-sands-41262.herokuapp.com/api/login",
        { username: "pikachu", password: "pikachu" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        return res.token;
      })
      .then((token) => this.fetchPokemonlist(token));
  },
  methods: {
    // Step 3 : "Get pokemon list 🎉"
    fetchPokemonlist(token) {
      return axios
        .get("https://cryptic-sands-41262.herokuapp.com/api/pokemons", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data)
        .then((res) => console.log(res));
    },
  },
};
</script>

