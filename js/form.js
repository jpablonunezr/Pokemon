
const nameInput = document.querySelector('.name-input input')
const nameConfirmation = document.querySelector('.confirmation')
const nameTargetBoy = document.querySelector('#nameTargetBoy')
const nameTargetGirl = document.querySelector('#nameTargetGirl')
const playerTargetName = document.querySelector('.user #playerTargetName')

const charaterContainer = document.querySelector('.characters')
const charaterGirl = document.querySelector('.girl')
const charaterBoy = document.querySelector('.boy')
const steps = document.querySelector('.steps')

const optGirl = document.querySelector('#optGirl')
const optBoy = document.querySelector('#optBoy')

// const apretar = () => {}


const chooseGender = (gender) => {
  saveStorage('gender', gender)
  charaterContainer.classList.remove('girl', 'boy')
  charaterContainer.classList.add(gender)
}

optBoy.addEventListener('click', () => {
  chooseGender('boy')
  saveStorage('step', 'second')
  steps.classList.replace('first', 'second')
  nameInput.focus()
})

optGirl.addEventListener('click', () => {
  chooseGender('girl')
  saveStorage('step', 'second')
  steps.classList.replace('first', 'second')
  nameInput.focus()
})

nameConfirmation.onclick = () => {
  const USER_NAME = nameInput.value
  console.log(USER_NAME)
  saveStorage('name', USER_NAME)
  steps.classList.replace('second', 'third')
  nameTargetBoy.classList.add('showname')
  nameTargetGirl.classList.add('showname')
  setTimeout(() => nameTargetGirl.innerHTML = USER_NAME, 200)
  nameTargetBoy.innerHTML = USER_NAME
}


// optBoy.onclick = chooseGender('boy')
// optGirl.onclick = chooseGender('girl')



nameInput.addEventListener('keyup', function(){
  let name = nameInput.value
  nameTargetGirl.classList.add('on')
  nameTargetGirl.value = name
});
