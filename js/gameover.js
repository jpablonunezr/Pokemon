const containerCounterVictories = document.querySelector('.counter-victories')
const containerCounterDefeats = document.querySelector('.counter-defeats')
const containerCounterDraws = document.querySelector('.counter-draws')

const playerResultTitle = document.querySelector('.gameover h4')
const battleResultTitle = document.querySelector('.gameover h6')


function playerWin(text, result) {

  containerCounterVictories.setAttribute('counter',victoryCounter)
  containerCounterDefeats.setAttribute('counter',defeatCounter)
  containerCounterDraws.setAttribute('counter',drawCounter)

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
