// CPU opciones
const cpuGreen = document.getElementById('cpuGrass')
const cpuFire = document.getElementById('cpuFire')
const cpuWater = document.getElementById('cpuWater')
const cpuSelection = document.getElementById('cpuSelection')

// Contadores
const counter = document.getElementById('counter')
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
const showWon = () => won.classList.add('show')
const showDraw = () => draw.classList.add('show')
const showLost = () => lost.classList.add('show')

// Contador de victorias
let victoryCounter = 0
let defeatCounter = 0

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
  // Quitar selección del usuario
  for (userPokemon of userPokemonCards) {
    userPokemon.classList.remove('selected');
  }

  // Quitar selección de la CPU
  for (cpuPokemon of cpuPokemonCards) {
    cpuPokemon.classList.remove('selected');
  }

  draw.classList.remove('show')
  lost.classList.remove('show')
  won.classList.remove('show')

  counter.classList.add('countdown')
}

function refreshFX() {
  for (image of FX_IMAGE) {
    image.src = FX_SRC
  }
}

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
    setTimeout(clearCounter, countDown)
    setTimeout(refreshFX, delayShowResult)

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

    // Water
    if (waterWon) {
      setTimeout(fireSelected, countDown)
      setTimeout(showWon, delayShowResult)
      victoryCounter += 1
      console.log('Victorias: ' + victoryCounter)
    }

    if (waterLost) {
      setTimeout(grassSelected, countDown)
      setTimeout(showLost, delayShowResult)
      defeatCounter += 1
      console.log('Derrotas: ' + defeatCounter)
    }

    if (waterDraw) {
      setTimeout(waterSelected, countDown)
      setTimeout(showDraw, delayShowResult)
    }

    // Green
    if (grassWon) {
      setTimeout(waterSelected, countDown)
      setTimeout(showWon, delayShowResult)
      victoryCounter += 1
      console.log('Victorias: ' + victoryCounter)
    }

    if (grassLost) {
      setTimeout(fireSelected, countDown)
      setTimeout(showLost, delayShowResult)
      defeatCounter += 1
      console.log('Derrotas: ' + defeatCounter)
    }

    if (grassDraw) {
      setTimeout(grassSelected, countDown)
      setTimeout(showDraw, delayShowResult)
    }

    // Fire
    if (fireWon) {
      setTimeout(grassSelected, countDown)
      setTimeout(showWon, delayShowResult)
      victoryCounter += 1
      console.log('Victorias: ' + victoryCounter)

    }

    if (fireLost) {
      setTimeout(waterSelected, countDown)
      setTimeout(showLost, delayShowResult)
      defeatCounter += 1
      console.log('Derrotas: ' + defeatCounter)
    }

    if (fireDraw) {
      setTimeout(fireSelected, countDown)
      setTimeout(showDraw, delayShowResult)
    }

    lifeCounter()
  })
)



// Refresh gif
// const fx = document.querySelectorAll('.test')
// const fxsrc = 'img/fx.gif';


// function refreshFX() {
//   for (el of fx) {
//     el.onclick = () => console.log('caca')
//   }
// }

// fx.forEach((poto) => {
//   poto.addEventListener('click', () => {
//     poto.src = fxsrc
//   })
// })

// fx.forEach((card) => {
//   caca.addEventListener('click', () => {
//     caca.src = fxsrc
//   })
// })


// FX Hover card
// const FX_IMAGE = document.querySelectorAll('.fx-gif')
// const FX_SRC = 'img/fx.gif';


// for (card of userPokemonCards) {
//   card.addEventListener('mouseover', () => {
//     for (image of FX_IMAGE) {
//       image.src = FX_SRC
//     }
//   })
// }

// for (const card of fx) {
//   card.onclick = () => {
//     card.src = fxsrc
//   }
// }
