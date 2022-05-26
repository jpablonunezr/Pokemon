// CPU opciones
const cpuGreen = document.getElementById('cpuGrass')
const cpuFire = document.getElementById('cpuFire')
const cpuWater = document.getElementById('cpuWater')
const cpuSelection = document.getElementById('cpuSelection')

// Contadores
const countDown = 1000;

// Opciones usuario
const userPokemonCards = document.querySelectorAll('#userSelection .pokemon__card')
const cpuPokemonCards = document.querySelectorAll('#cpuSelection .pokemon__card')

// Players life
const cpuLife = document.querySelector('#cpuSelection .lifes')
const userLife = document.querySelector('#userSelection .lifes')

// Resultados
const lost = document.querySelector('.lost');
const won  = document.querySelector('.won');
const draw = document.querySelector('.draw');
const delayShowResult = 1200;

// Random CPU
let randomCPU = (options) =>  options[Math.floor(Math.random() * options.length)]

// Opciones CPU Random Array
const CPU_OPTIONS = ['grass', 'fire', 'water']

// Mensaje resultado
const DEFAULT = 'Battle • '
const VICTORY = 'Victory • '
const DEFEAT = 'Defeat • '
const DRAW = 'Draw • '

// Creamos los textos de los resultados
function createResultElements() {
    let i = 0
    do {
      const container = document.querySelector('.result__text')
      const element = document.createElement('span')
      element.innerText = DEFAULT

      container.appendChild(element)
      i++
    }
    while (i < 50)
}

createResultElements();

// Cambia el texto según el resultado
function setResultText(result) {
  const resultTitles = document.querySelectorAll('.result__text span')
  const resultContainer = document.querySelector('#resultContainer')
  for (titles of resultTitles) titles.innerText = result
  resultContainer.classList.add('show')
}

// Contador de victorias
let victoryCounter = 0
let defeatCounter = 0
let totalVictories = victoryCounter
let totalBattles = 0

const totalVictoriesCounter = document.querySelector('#victoriesDisplay')
const totalBattlesCounter = document.querySelector('#battlesDisplay')
// let totalBattles = battlesCounter


// CPU azar
const fireSelected  = () => cpuFire.classList.add('selected')
const grassSelected = () => cpuGreen.classList.add('selected')
const waterSelected = () => cpuWater.classList.add('selected')

// Animación CPU random
const startCpuAnimation = () => cpuSelection.classList.add('animation')
const stopCpuAnimation  = () => cpuSelection.classList.remove('animation')
const clearCounter = () => counter.classList.remove('countdown')

//audio
// var theme = document.getElementById('battleTheme');
// theme.volume = 0.2;
// theme.play()
// var battle = new Audio('../audio/battle.mp3');
// var victory = new Audio('../audio/victory.mp3');

// FX Hover card
const FX_IMAGE = document.querySelectorAll('.fx-gif')
const FX_SRC = 'img/fx/fire.gif';

function lifeCounter() {
  if (victoryCounter == 1) setTimeout(() => cpuLife.classList.add('x'), delayShowResult + 1200)
  if (victoryCounter == 2) setTimeout(() => cpuLife.classList.add('xx'), delayShowResult + 1200)
  if (victoryCounter == 3) setTimeout(() => cpuLife.classList.add('xxx'), delayShowResult + 1200)
  if (victoryCounter == 4) setTimeout(() => cpuLife.classList.add('xxxx'), delayShowResult + 1200)
  if (victoryCounter == 5) setTimeout(() => cpuLife.classList.add('xxxxx'), delayShowResult + 1200)
  if (defeatCounter == 1)  setTimeout(() => userLife.classList.add('x'), delayShowResult + 1200)
  if (defeatCounter == 2)  setTimeout(() => userLife.classList.add('xx'), delayShowResult + 1200)
  if (defeatCounter == 3)  setTimeout(() => userLife.classList.add('xxx'), delayShowResult + 1200)
  if (defeatCounter == 4)  setTimeout(() => userLife.classList.add('xxxx'), delayShowResult + 1200)
  if (defeatCounter == 5)  setTimeout(() => userLife.classList.add('xxxxx'), delayShowResult + 1200)
}

function clearClass() {
  for (userPokemon of userPokemonCards) userPokemon.classList.remove('selected') // Quitar selección del usuario
  for (cpuPokemon of cpuPokemonCards) cpuPokemon.classList.remove('selected') // Quitar selección de la CPU
  resultContainer.classList.remove('show')
}

const showFX = () => { for (image of FX_IMAGE) image.src = FX_SRC }


// Función principal
userPokemonCards.forEach((element) =>
  element.addEventListener('click', () => {
    const CPU = randomCPU(CPU_OPTIONS)
    console.log('cpu: ' + CPU)
    const GRASS = element.classList.contains('grass')
    const FIRE  = element.classList.contains('fire')
    const WATER = element.classList.contains('water')

    clearClass()
    element.classList.add('selected')

    startCpuAnimation()
    setTimeout(stopCpuAnimation, countDown)
    setTimeout(showFX, delayShowResult)

    // battles counter
    totalBattles += 1
    totalBattlesCounter.innerText = totalBattles

    // Conditional Won, Lost, Draw
    const waterWon  = WATER && CPU == 'fire'
    const waterLost = WATER && CPU == 'grass'
    const waterDraw = WATER && CPU == 'water'

    const grassWon  = GRASS && CPU == 'water'
    const grassLost = GRASS && CPU == 'fire'
    const grassDraw = GRASS && CPU == 'grass'

    const fireWon  = FIRE && CPU == 'grass'
    const fireLost = FIRE && CPU == 'water'
    const fireDraw = FIRE && CPU == 'fire'

    // Si gana
    if (waterWon || fireWon || grassWon)  {
      setTimeout(() => setResultText(VICTORY), delayShowResult)
      victoryCounter += 1
      totalVictoriesCounter.innerHTML = '<b>'+victoryCounter+'</b>'
    }

    // Si pierde
    if (waterLost || fireLost || grassLost) {
      setTimeout(() => setResultText(DEFEAT), delayShowResult)
      defeatCounter += 1
    }

    // Si empata
    if (waterDraw || fireDraw || grassDraw) setTimeout(() => setResultText(DRAW), delayShowResult)

    // Selección para la CPU según el resultado
    if (waterWon  || grassLost || fireDraw) setTimeout(fireSelected, countDown)
    if (waterLost || grassDraw || fireWon)  setTimeout(grassSelected, countDown)
    if (waterDraw || grassWon  || fireLost) setTimeout(waterSelected, countDown)

    lifeCounter()
  })
)

// Crear la cantidad de vida para los jugadores
class Lifes {
  constructor(player) {
    let i = 0
    do {
      const lifeToken = document.createElement('i');
      this.player = player.appendChild(lifeToken)
      i++
    }
    while (i < 5)
  }
}

let CPU_TOTAL_LIFE = new Lifes(cpuLife);
let USER_TOTAL_LIFE = new Lifes(userLife);
