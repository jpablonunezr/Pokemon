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


const saveStorage = async (storage, num) =>  localStorage.setItem(storage, num)

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
