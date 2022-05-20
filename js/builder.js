// Seteamos la cantidad de vida para los jugadores
class Lifes {
  constructor(player) {
    let i = 0
    do {
      const lifeToken = document.createElement('i');
      this.player = player.appendChild(lifeToken)
      i++
    }
    while (i < 5)
  }
}

let CPU_TOTAL_LIFE = new Lifes(cpuLife);
let USER_TOTAL_LIFE = new Lifes(userLife);
