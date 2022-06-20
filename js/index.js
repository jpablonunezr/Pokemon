function pokemonGame() {
  gameBuilder()
  registerBuilder()
  cardGame()
  darkMode()
  menu()

  const fps = new FPS("#fps");
  fps.start();
}

pokemonGame()
