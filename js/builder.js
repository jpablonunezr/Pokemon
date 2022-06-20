// // Create Pokemons
// const createPokemon = (pokemon) => `
//   <div id="${pokemon.target}${pokemon.id_type}" class="pokemon__card ${pokemon.game_type} ${pokemon.element_type} ${pokemon.name} ${pokemon.evolution}">
//     <div class="image" data-name="${pokemon.jp}"></div>
//     <div class="bg">
//       <div class="fx">
//         <img src="" class="fx-gif">
//       </div>
//       <div class="type" data-original="${pokemon.name} — ${pokemon.origin}" data-index="#${pokemon.number}">
//         <div class="icon">${pokemon.element_type}</div>
//         <div class="label">${pokemon.name}</div>
//       </div>
//     </div>
//   </div>
// `;



// // Create Players
// const createPlayer = (player) => `
// <div class="player ${player.type}">
//   <div class="lifes"></div>
//   <div class="avatar"></div>
//   <div class="name">
//     <h6>${player.jp}</h6>
//     <h1 id="${player.id}">${player.typeUpper}</h1>
//     <h2>${player.name}</h2>
//   </div>
// </div>
// `;

// const cpuCreate = (gary, pkm1, pkm2, pkm3) => cpuSelection.innerHTML  = createPlayer(gary) + createPokemon(pkm1) + createPokemon(pkm2) + createPokemon(pkm3)
// const userCreate = (user, pkm1, pkm2, pkm3) => userSelection.innerHTML = createPokemon(pkm1) + createPokemon(pkm2) + createPokemon(pkm3) + createPlayer(user)

// // userCreate(user, sneasel, cleffa, abra)
// cpuCreate(gary, chikorita, cyndaquil, totodile)
// userCreate(user, bulbasaur, charmander, squirtle)

// const userNameStorage = localStorage.getItem('name') || 'User'
// playerTargetName.innerHTML = userNameStorage

// const evolutionPokemon = (type, pkm) => type.outerHTML = createPokemon(pkm)



// let cpuARR
// let userARR


// const PLAYER_URL = 'js/json/trainer.json'
// fetch(PLAYER_URL)
// .then(response => response.json())
// .then(data => {
//   const CPU_DATA = data.trainers[0]
//   const USER_DATA = data.trainers[1]

//   const createPlayer = (player) => `
//   <div class="player ${player.type}">
//     <div class="lifes"></div>
//     <div class="avatar"></div>
//     <div class="name">
//       <h6>${player.nameJP}</h6>
//       <h1 id="${player.id}">${player.typeID}</h1>
//       <h2>${player.name}</h2>
//     </div>
//   </div>
//   `;

//   // cpuSelection.innerHTML = createPlayer(CPU_DATA)
//   // userSelection.innerHTML = createPlayer(USER_DATA)
//   }
// )




const pkm = (pokemon) => `
<div id="${pokemon.target}${pokemon.id_type}" class="pokemon__card ${pokemon.game_type} ${pokemon.element_type} ${pokemon.name} ${pokemon.evolution}">
  <div class="image" data-name="${pokemon.jp}"></div>
  <div class="bg">
    <div class="fx">
      <img src="" class="fx-gif">
    </div>
    <div class="type" data-original="${pokemon.name} — ${pokemon.origin}" data-index="#${pokemon.number}">
      <div class="icon">${pokemon.element_type}</div>
      <div class="label">${pokemon.name}</div>
    </div>
  </div>
</div>
`;


const ply = (player) => `
<div class="player ${player.type}">
  <div class="lifes"></div>
  <div class="avatar"></div>
  <div class="name">
    <h6>${player.nameJP}</h6>
    <h1 id="${player.id}">${player.typeID}</h1>
    <h2>${player.name}</h2>
  </div>
</div>
`;

const POKEMON_URL = 'js/json/pokemon.json'
const gameBuilder = () => {
  return fetch(POKEMON_URL)
  .then(response => response.json())
  .then(data => {
    const BULBASAUR = data.pokemons[0]
    const CHARMANDER = data.pokemons[1]
    const SQUIRTLE = data.pokemons[2]
    const CHIKORITA = data.pokemons[3]
    const CYNDAQUILL = data.pokemons[4]
    const TOTODILE = data.pokemons[5]

    const CPU = data.players[0]
    const USER = data.players[1]

    cpuSelection.innerHTML = ply(CPU) + pkm(CHIKORITA) + pkm(CYNDAQUILL) + pkm(TOTODILE)
    userSelection.innerHTML = ply(USER) + pkm(BULBASAUR) + pkm(CHARMANDER) + pkm(SQUIRTLE)
    })
}
