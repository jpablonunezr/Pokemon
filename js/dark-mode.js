// Dark mode
function darkMode() {
  const body = document.querySelector("body")
  const desk = document.querySelector(".desk")

  const btnDarkMode = document.querySelector(".toggler .dark")
  const btnLightMode = document.querySelector(".toggler .light")

  let THEME_MODE = 'default'
  let THEME_APPLIED = localStorage.getItem('theme')

  btnDarkMode.onclick = () => {
    body.classList.add('dark-theme')
    btnDarkMode.classList.add('active')
    btnLightMode.classList.remove('active')
    THEME_MODE = 'dark'
    localStorage.setItem('theme', THEME_MODE)
  }

  btnLightMode.onclick = () => {
    body.classList.remove('dark-theme')
    btnLightMode.classList.add('active')
    btnDarkMode.classList.remove('active')
    THEME_MODE = 'default'
    localStorage.setItem('theme', THEME_MODE)
  }

  const changeToDarkMode = () => {
    body.classList.add('dark-theme')
    btnDarkMode.classList.add('active')
    btnLightMode.classList.remove('active')
  }

  const changeToLightMode = () => {
    body.classList.remove('dark-theme')
    btnLightMode.classList.add('active')
    btnDarkMode.classList.remove('active')
  }

  if (THEME_APPLIED == 'default') changeToLightMode()
  if (THEME_APPLIED == 'dark') changeToDarkMode()
}
