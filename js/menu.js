function menu() {
  const menuContainer = document.querySelector('.menu')
  const menuButton = document.querySelector('.menu .burger')
  menuButton.onclick = () => menuContainer.classList.toggle('active')
}
