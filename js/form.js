

async function registerBuilder() {
  await gameBuilder()

  const nameInput = document.querySelector('.name-input input')
  const nameButton = document.querySelector('.confirmation')
  const nameTargetBoy = document.querySelector('#nameTargetBoy')
  const nameTargetGirl = document.querySelector('#nameTargetGirl')
  const playerTargetName = document.querySelector('#playerTargetName')
  const playerAvatar = document.querySelector('.player.user')

  const charaterContainer = document.querySelector('.characters__container')
  const playerInfoContainer = document.querySelector('.player__container')
  const stepsContainer = document.querySelector('.register__container')

  const optGirl = document.querySelector('#optGirl')
  const optBoy = document.querySelector('#optBoy')
  const optFinish = document.querySelector('#optFinish')

  const registerContainer = document.querySelector('.register')
  const overlay = document.querySelector('.overlay')

  const backToFirst = document.querySelector('#backToFirst')
  const backToSecond = document.querySelector('#backToSecond')

  let isGirl = false
  let isBoy = false

  const registerShow = () => {
    const finalStep = localStorage.getItem('step') == 'finish'
    finalStep && registerContainer.classList.add('hide')

    if ( localStorage.getItem('gender') == 'girl') {
      playerAvatar.classList.add('girl')
    }
  }

  registerShow()

  // 1
  const chooseGender = (gender) => {
    saveStorage('gender', gender)
    saveStorage('step', 'first')
    charaterContainer.classList.remove('girl', 'boy')
    charaterContainer.classList.add(gender)
  }

  // 2
  optBoy.addEventListener('click', () => {
    chooseGender('boy')
    saveStorage('step', 'second')
    stepsContainer.classList.replace('first', 'second')
    nameInput.focus()
    playerInfoContainer.classList.add('boy')
    isBoy = true
  })

  optGirl.addEventListener('click', () => {
    chooseGender('girl')
    saveStorage('step', 'second')
    stepsContainer.classList.replace('first', 'second')
    nameInput.focus()
    playerAvatar.classList.add('girl')
    playerInfoContainer.classList.add('girl')
    isGirl = true
  })

  // 3
  optFinish.addEventListener('click', () => {
    saveStorage('step', 'finish')
    stepsContainer.classList.replace('third', 'finish')
    overlay.classList.add('on')
    setTimeout(() => {
      overlay.classList.remove('on')
      registerContainer.classList.add('hide')
    }, 1500);

    const BATTLE_SOUND = document.getElementById('battleTheme');
    BATTLE_SOUND.volume = 0.2;

    BATTLE_SOUND.play()
  })

  // Back
  backToFirst.onclick = () => {
    stepsContainer.classList.replace('second', 'first')
    playerInfoContainer.classList.remove('boy', 'girl')
    charaterContainer.classList.remove('girl', 'boy')
    playerAvatar.classList.remove('girl')
    playerInfoContainer.classList.remove('girl')
    isBoy = false
    isGirl = false
  }

  backToSecond.onclick = () => {
    stepsContainer.classList.replace('third', 'second')
    nameInput.value = ''
    nameInput.focus()
    nameTargetGirl.classList.remove('on')
    nameTargetBoy.classList.remove('on')
    nameTargetGirl.value = ''
    nameTargetBoy.value = ''
  }

  function nameConfirmation() {
    const nameSelected = nameInput.value
    saveStorage('step', 'third')
    stepsContainer.classList.replace('second', 'third')

    if ( nameSelected === '') {
      saveStorage('name', 'User')
      nameTargetGirl.value = 'User'
      nameTargetBoy.value = 'User'

      isGirl ? nameTargetGirl.classList.add('on') : nameTargetBoy.classList.add('on')
      playerTargetName.innerText = 'User'
    }

    else {
      playerTargetName.innerText = nameSelected
      saveStorage('name', nameSelected)
    }

  }

  nameButton.onclick = nameConfirmation

  // Cuando escribimos en el input
  nameInput.addEventListener('keyup', function(e){
    let name = nameInput.value
    if (isGirl) {
      nameTargetGirl.classList.add('on');
      nameTargetGirl.value = name
    }

    else {
      nameTargetBoy.classList.add('on')
      nameTargetBoy.value = name
    }

    if (e.key === "Enter") {
      e.preventDefault();
      nameConfirmation()
      optFinish.blur()
    }
  })

}
