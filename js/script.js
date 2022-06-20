async function cardGame() {
  await gameBuilder()


  const playerResultTitle = document.querySelector('.gameover h4')

  const cpuGreen = document.getElementById('cpuGrass')
  const cpuFire = document.getElementById('cpuFire')
  const cpuWater = document.getElementById('cpuWater')

  const cpuSelection = document.getElementById('cpuSelection')
  const userSelection = document.getElementById('userSelection')

  const userPokemonCards = document.querySelectorAll('#userSelection .pokemon__card')
  const cpuPokemonCards = document.querySelectorAll('#cpuSelection .pokemon__card')

  const cpuLife = document.querySelector('#cpuSelection .lifes')
  const userLife = document.querySelector('#userSelection .lifes')

  const countDown = 1000;
  const delayShowResult = 1200;


  let randomCPU = (options) =>  options[Math.floor(Math.random() * options.length)]

  const CPU_OPTIONS = ['grass', 'fire', 'water']

  const TEXT_DEFAULT = 'Battle • '
  const TEXT_VICTORY = 'Victory • '
  const TEXT_DEFEAT = 'Defeat • '
  const TEXT_DRAW = 'Draw • '

  function messageResultCreator() {
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

  messageResultCreator()

  function setResultText(result) {
    const resultTitles = document.querySelectorAll('.result__text span')
    const resultContainer = document.querySelector('#resultContainer')
    for (titles of resultTitles) titles.innerText = result
    resultContainer.classList.add('show')
  }

  let victoryCounter = 0
  let defeatCounter = 0
  let drawCounter = 0
  let totalBattles = parseInt(localStorage.getItem('battles')) || 0

  const totalVictoriesCounter = document.querySelector('#victoriesDisplay')
  const totalBattlesCounter = document.querySelector('#battlesDisplay')
  totalBattlesCounter.innerText = totalBattles

  let totalExp = parseInt(localStorage.getItem('exp')) || 0
  const totalExpCounter = document.querySelector('#experienceDisplay')
  totalExpCounter.innerText = totalExp

  let totalLvl = parseInt(localStorage.getItem('lvl')) || 0
  const totalLvlCounter = document.querySelector('#levelDisplay')
  totalLvlCounter.innerHTML = '<b>'+totalLvl+'</b>'

  let expThreshold = parseInt(localStorage.getItem('exp-threshold')) || 100

  function levelUp(exp) {
    if (exp >= expThreshold) {
      totalLvl++
      expThreshold = expThreshold * 1.5
      saveStorage('lvl', totalLvl)
      saveStorage('exp-threshold', expThreshold)
      totalLvlCounter.innerHTML = '<b>'+totalLvl+'</b>'

      if (expThreshold > (expThreshold * 1.5)) expThreshold = expThreshold * 1.5
    }
  }

  levelUp()

  const fireSelected  = () => cpuFire.classList.add('selected')
  const grassSelected = () => cpuGreen.classList.add('selected')
  const waterSelected = () => cpuWater.classList.add('selected')

  const startCpuAnimation = () => cpuSelection.classList.add('animation')
  const stopCpuAnimation  = () => cpuSelection.classList.remove('animation')

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
    for (userPokemon of userPokemonCards) userPokemon.classList.remove('selected')
    for (cpuPokemon of cpuPokemonCards) cpuPokemon.classList.remove('selected')
    resultContainer.classList.remove('show')
  }

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



  const playGame = () => {
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

        totalBattles++
        totalBattlesCounter.innerText = totalBattles
        saveStorage('battles', totalBattles)

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

        if (waterWon  || grassLost || fireDraw) setTimeout(fireSelected, countDown)
        if (waterLost || grassDraw || fireWon)  setTimeout(grassSelected, countDown)
        if (waterDraw || grassWon  || fireLost) setTimeout(waterSelected, countDown)
      })
    )
  }

  playGame()

  function playerWin(text, result) {
    const containerCounterVictories = document.querySelector('.counter-victories')
    const containerCounterDefeats = document.querySelector('.counter-defeats')
    const containerCounterDraws = document.querySelector('.counter-draws')

    containerCounterVictories.setAttribute('counter',victoryCounter)
    containerCounterDefeats.setAttribute('counter',defeatCounter)
    containerCounterDraws.setAttribute('counter',drawCounter)


    const desk = document.querySelector(".desk")
    playerResultTitle.innerText = text
    desk.classList.add(result)

    const counters = document.querySelectorAll('.counter-final')
    const velocity = 300

    counters.forEach( counter => {
      const animate = () => {
        const value = +counter.getAttribute('counter')
        const data = +counter.innerText;

        const time = value / velocity
        if(data < value) {
          counter.innerText = Math.ceil(data + time)
          setTimeout(animate, 1)
        }

        else {
          counter.innerText = value
        }
      }
      setTimeout(animate, 1000)
    })
  }

  function lifeCreate(target, lifes) {
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
}
