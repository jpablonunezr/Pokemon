function showElements () {
  const register = document.querySelector('.register')
  const overlay = document.querySelector('.overlay')

  register.style.visibility = "visible"
  overlay.classList.add('transition')

  const fps = new FPS("#fps");
  fps.start();

  setTimeout(() => {
    overlay.classList.remove('on')
  }, 0)
}

document.addEventListener('DOMContentLoaded', showElements, false);

function pokemonGame() {
  gameBuilder()
  registerBuilder()
  cardGame()
  darkMode()
  menu()
}

pokemonGame()
