// Dark mode
const btnDarkMode = document.querySelector(".toggler .dark");
const btnLightMode = document.querySelector(".toggler .light");
const body = document.querySelector("body");

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


//menu
const menuContainer = document.querySelector('.menu')
const menuButton = document.querySelector('.menu .burger')

menuButton.onclick = () => menuContainer.classList.toggle('active')
