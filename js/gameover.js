const displayCounterVictories = document.querySelector('.counter-victories')
const displayCounterDefeats = document.querySelector('.counter-defeats')
const displayCounterDraws = document.querySelector('.counter-draws')


function playerWin() {
  displayCounterVictories.setAttribute('counter',victoryCounter)
  displayCounterDefeats.setAttribute('counter',defeatCounter)
  displayCounterDraws.setAttribute('counter',drawCounter)

  document.querySelector('.desk').classList.add('winner')

  const counters = document.querySelectorAll('.counter-final')
  const velocity = 200

  counters.forEach( counter => {
    const animate = () => {
      const value = +counter.getAttribute('counter')
      const data = +counter.innerText;

      const time = value / velocity
      if(data < value) {
        counter.innerText = Math.ceil(data + time)
        setTimeout(animate, 150)
      }

      else {
        counter.innerText = value
      }
    }
    setTimeout(animate, 1000)
  })
}
