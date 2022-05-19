// Mouse cursor (plugins)
const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let speed = .9;

function animate() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + (distX * speed);
    cursorY = cursorY + (distY * speed);

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animate);
}

animate();

document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
})

// Pokemon cards
const cards = document.getElementById("userSelection")
const nav = document.getElementById("nav")

cards.addEventListener("mouseover", () => cursor.classList.add('big', 'blur'))
cards.addEventListener("mouseleave", () => cursor.classList.remove('big', 'blur'))

nav.addEventListener("mouseover", () => cursor.classList.add('big'))
nav.addEventListener("mouseleave", () => cursor.classList.remove('big'))
