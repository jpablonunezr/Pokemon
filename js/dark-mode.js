// Dark mode

const btnDarkMode = document.querySelector(".theme-mode .dark");
const btnLightMode = document.querySelector(".theme-mode .light");
const body = document.querySelector("body");

btnDarkMode.onclick = () => {
  body.classList.add('dark-theme')
  btnDarkMode.classList.add('active')
  btnLightMode.classList.remove('active')
}
btnLightMode.onclick = () => {
  body.classList.remove('dark-theme')
  btnLightMode.classList.add('active')
  btnDarkMode.classList.remove('active')
}

// darkModeToggle();
