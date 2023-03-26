function menu() {
  const menuContainer = document.querySelector('.menu')
  const menuButton = document.querySelector('[menu-toggler]')
  menuButton.onclick = () => menuContainer.classList.toggle('active')
}
