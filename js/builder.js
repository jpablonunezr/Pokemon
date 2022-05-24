// Create Pokemons
const createPokemon = (pokemon) => `
  <div id="${pokemon.target}${pokemon.idtype}" class="pokemon__card ${pokemon.type} ${pokemon.type2} ${pokemon.name}">
    <div class="image" data-name="${pokemon.jp}"></div>
    <div class="bg">
      <div class="fx">
        <img src="" class="fx-gif">
      </div>
      <div
        class="type"
        data-original="${pokemon.name} — ${pokemon.origin}"
        data-index="#${pokemon.number}"
      >
        <div class="icon">${pokemon.type}</div>
        <div class="label">${pokemon.name}</div>
        <div class="image-bg"></div>
      </div>
    </div>
  </div>
`;

// Create Players
const createPlayer = (player) => `
<div class="player ${player.type}">
  <div class="lifes"></div>
  <div class="avatar"></div>
  <div class="name">
    <h6>${player.jp}</h6>
    <h1>${player.typeUpper}</h1>
    <h2>${player.name}</h2>
  </div>
</div>
`;

const cpuCreate = (gary, pkm1, pkm2, pkm3) => cpuSelection.innerHTML  = createPlayer(gary) + createPokemon(pkm1) + createPokemon(pkm2) + createPokemon(pkm3)
const userCreate = (user, pkm1, pkm2, pkm3) => userSelection.innerHTML = createPokemon(pkm1) + createPokemon(pkm2) + createPokemon(pkm3) + createPlayer(user)

cpuCreate(gary, chikorita, cyndaquil, totodile)
userCreate(user, cleffa, charmander, squirtle)
