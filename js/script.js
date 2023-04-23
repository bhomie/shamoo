const navButtons = document.querySelectorAll('button.nav__button')
const navSections = document.querySelectorAll('section')
const closeButtons = document.querySelectorAll('button.shadeContent__close')
const shade = document.querySelector('div.shade')
const nav = document.querySelector('nav')
const swapper = document.querySelector('.swapper');
const logo = document.querySelector('.-logo');
const titles = ["hero of time", "dragon slayer", "mentor", "creator", "prompt writer", "dreamer", "vocaloid", "space cowboy", "game addict"];
const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "😛", "🤔", "🤨",
  "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
  "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰",
  "😱", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤮", "🤧", "😇", "🤠", "🥳", "😈", "👿", "👹",
  "👺", "💀", "👻", "👽", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
];

let index = 0;

// lisetners

navButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    revealSection(e)
  })
})

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closeShade()
  })
})

// functions 

function revealSection(e) {
  navButtons.forEach((button, index) => {
    if (e.target.getAttribute('navTo') == navSections[index].getAttribute('content')) {
      button.classList.add('-active')
      navSections[index].classList.add('-reveal')
    } else {
      button.classList.remove('-active')
      navSections[index].classList.remove('-reveal')
    }
  })

  nav.classList.add('-inverse')
  shade.classList.add('-reveal')
}

function closeShade() {
  navButtons.forEach((button, index) => {
    button.classList.remove('-active')
    navSections[index].classList.remove('-reveal')
  })

  nav.classList.remove('-inverse')
  shade.classList.remove('-reveal')
}

const changeText = () => {
  let currentTitle = '';
  const availableTitles = titles.filter(title => title !== currentTitle);
  const randomIndex = Math.floor(Math.random() * availableTitles.length);
  const randomTitle = availableTitles[randomIndex] + '.';
  const msWait = 150;
  let spaceCounter = 0;
  
  // Remove
  const animChars = document.querySelectorAll('.-animChar');
  currentTitle = animChars.length;
  animChars.forEach((char, i) => {
    char.style.animationDelay = `${(animChars.length - i) * 50}ms`;
    char.classList.add('-reverse');
  });
  
  // Appear
  setTimeout(() => {
    let newInnerHTML = '';
    for (let i = 0; i < randomTitle.length; i++) {
      if (randomTitle[i] === ' ') {
        newInnerHTML += `<span>${randomTitle[i]}</span>`;
        spaceCounter++
      } else {
        newInnerHTML += `<span class="-animChar" style="animation-delay: ${i * 50}ms">${randomTitle[i]}</span>`;
      }
    }
    swapper.innerHTML = newInnerHTML;
  }, (currentTitle - spaceCounter) * msWait);
  
  setTimeout(changeText, ((randomTitle.length - spaceCounter) * msWait) + 5000);
}

changeText();

logo.addEventListener('mousedown', () => {
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

  const { left, top, width, height } = logo.getBoundingClientRect();
  emoji.style.left = `${left + (width / 2)}px`;
  emoji.style.top = `${top + (height / 2)}px`;

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = `scale(20)`;
    emoji.style.transition = `all 0.5s cubic-bezier(0.42, 0, 0.58, 1)`;
  }, 80);

  setTimeout(() => {
    emoji.style.transform = `scale(0)`;
    emoji.style.transition = `all 0.5s cubic-bezier(0.42, 0, 0.58, 1)`;

    setTimeout(() => {
      emoji.remove();
    }, 500);
  }, 1000);
});
