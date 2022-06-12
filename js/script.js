const body = document.querySelector("body")
const desk = document.querySelector(".desk")
// CPU opciones
const cpuGreen = document.getElementById('cpuGrass')
const cpuFire = document.getElementById('cpuFire')
const cpuWater = document.getElementById('cpuWater')

// Players
const cpuSelection = document.getElementById('cpuSelection')
const userSelection = document.getElementById('userSelection')

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
const TEXT_DEFAULT = 'Battle • '
const TEXT_VICTORY = 'Victory • '
const TEXT_DEFEAT = 'Defeat • '
const TEXT_DRAW = 'Draw • '

// Creamos los textos de los resultados
function createResultElements() {
  let i = 0
  do {
    const container = document.querySelector('.result__text')
    const element = document.createElement('span')
    element.innerText = TEXT_DEFAULT

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

// Contador de resultados
let victoryCounter = 0
let defeatCounter = 0
let drawCounter = 0
let totalVictories = victoryCounter
let totalBattles = parseInt(localStorage.getItem('battles')) || 0

const totalVictoriesCounter = document.querySelector('#victoriesDisplay')
const totalBattlesCounter = document.querySelector('#battlesDisplay')
totalBattlesCounter.innerText = totalBattles

// Contador de experiencia
let totalExp = parseInt(localStorage.getItem('exp')) || 0
const totalExpCounter = document.querySelector('#experienceDisplay')
totalExpCounter.innerText = totalExp

// Guardar datos en storage
const saveStorage = async (storage, num) =>  localStorage.setItem(storage, num)

// Contador de Niveles
let totalLvl = parseInt(localStorage.getItem('lvl')) || 0
const totalLvlCounter = document.querySelector('#levelDisplay')
totalLvlCounter.innerHTML = '<b>'+totalLvl+'</b>'

// LevelUp
let expThreshold = parseInt(localStorage.getItem('exp-threshold')) || 100

const levelUp = (exp) => {
  if (exp >= expThreshold) {
    totalLvl++
    expThreshold = expThreshold * 1.5
    saveStorage('lvl', totalLvl)
    saveStorage('exp-threshold', expThreshold)
    totalLvlCounter.innerHTML = '<b>'+totalLvl+'</b>'
    console.log(expThreshold)

    if (expThreshold > (expThreshold * 1.5)) expThreshold = expThreshold * 1.5
  }
}

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

// FX Fight
const FX_IMAGE = document.querySelectorAll('.fx-gif')
const FX_SRC = 'img/fx/fire.gif';
const showFX = () => { for (image of FX_IMAGE) image.src = FX_SRC }

function loseLifes(result, target) {
  result == 1 && setTimeout(() => target.classList.add('x'), delayShowResult + 1200)
  result == 2 && setTimeout(() => target.classList.add('xx'), delayShowResult + 1200)
  result == 3 && setTimeout(() => target.classList.add('xxx'), delayShowResult + 1200)
  result == 4 && setTimeout(() => target.classList.add('xxxx'), delayShowResult + 1200)
  result == 5 && setTimeout(() => target.classList.add('xxxxx'), delayShowResult + 1200)
}

function clearClass() {
  for (userPokemon of userPokemonCards) userPokemon.classList.remove('selected') // Quitar selección del usuario
  for (cpuPokemon of cpuPokemonCards) cpuPokemon.classList.remove('selected') // Quitar selección de la CPU
  resultContainer.classList.remove('show')
}

// function evol() {
//   if (fireEvolution == 1) evolutionPokemon(userFire, charmeleon)
//   if (fireEvolution == 2) evolutionPokemon(userFire, charizard)
// }

const VICTORY = () => {
  setTimeout(() => setResultText(TEXT_VICTORY), delayShowResult)
  victoryCounter++
  loseLifes(victoryCounter, cpuLife)
  totalVictoriesCounter.innerHTML = '<b>'+victoryCounter+'</b>'

  totalExp += 50
  totalExpCounter.innerText = totalExp
  saveStorage('exp', totalExp)
  levelUp(totalExp)

  if (victoryCounter == 5) {
    userSelection.classList.add('disable')
    setTimeout(() => playerWin(`${localStorage.getItem('name')} Win!`, 'winner'), delayShowResult + 3000)
  }
}

const DEFEAT = () => {
  setTimeout(() => setResultText(TEXT_DEFEAT), delayShowResult)
  defeatCounter++
  loseLifes(defeatCounter, userLife)

  totalExp > 40? totalExp -= 40 : totalExp = 0
  totalExpCounter.innerText = totalExp
  saveStorage('exp', totalExp)
  levelUp(totalExp)
  defeatCounter == 5 && setTimeout(() => playerWin('CPU Win!', 'loser'), delayShowResult + 3000)
}

const DRAW = () => {
  drawCounter++
  setTimeout(() => setResultText(TEXT_DRAW), delayShowResult)
}

let fireEvolution = 0

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

    // Battles counter
    totalBattles++
    totalBattlesCounter.innerText = totalBattles
    saveStorage('battles', totalBattles)

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

    if (waterWon || fireWon || grassWon) VICTORY()
    if (waterLost || fireLost || grassLost) DEFEAT()
    if (waterDraw || fireDraw || grassDraw) DRAW()

    // Selección para la CPU según el resultado
    if (waterWon  || grassLost || fireDraw) setTimeout(fireSelected, countDown)
    if (waterLost || grassDraw || fireWon)  setTimeout(grassSelected, countDown)
    if (waterDraw || grassWon  || fireLost) setTimeout(waterSelected, countDown)

    // if (fireWon) fireEvolution += 1
    // console.log(fireEvolution)

  })
)


// Crear la cantidad de vida para los jugadores
// class Lifes {
//   constructor(player) {
//     let i = 0
//     do {
//       const lifeToken = document.createElement('i');
//       this.player = player.appendChild(lifeToken)
//       i++
//     }
//     while (i < 5)
//   }
// }

// let CPU_TOTAL_LIFE = new Lifes(cpuLife);
// let USER_TOTAL_LIFE = new Lifes(userLife);

const lifeCreate = (target, lifes) => {
  let i = 0

  do {
    const token = document.createElement('i')
    target.appendChild(token);
    i++
  }

  while (i < lifes)
}

lifeCreate(cpuLife, 5)
lifeCreate(userLife, 5)

// Menu
const menuContainer = document.querySelector('.menu')
const menuButton = document.querySelector('.menu .burger')

menuButton.onclick = () => menuContainer.classList.toggle('active')

// Defeat Rival
// const defeatRival = () => {
//   if (victoryCounter == 5) {
//     userSelection.classList.add('disable')
//     // setTimeout(playerWin(`${localStorage.getItem('name')} Win!`, 'winner'), delayShowResult + 700)
//     playerWin(`${localStorage.getItem('name')} Win!`, 'winner')
//   }

//   // defeatCounter == 5 && setTimeout(playerWin('CPU Win!', 'loser'), delayShowResult + 700)
//   defeatCounter == 5 && playerWin('CPU Win!', 'loser')
// }
