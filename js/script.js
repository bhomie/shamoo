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

// Event listeners
navButtons.forEach(button => button.addEventListener('click', revealSection));
closeButtons.forEach(button => button.addEventListener('click', closeShade));

// functions 

function revealSection(e) {
  navButtons.forEach((button, index) => {
    const section = navSections[index];
    const isActive = e.target.getAttribute('navTo') === section.getAttribute('content');
    
    button.classList.toggle('-active', isActive);
    section.classList.toggle('-reveal', isActive);
    
    // const paragraphs = section.querySelectorAll('.shadeContent__body');
    const paragraphs = section.querySelectorAll('h2,p');
    paragraphs.forEach((paragraph, i) => {
      paragraph.classList.toggle('-fadeIn', isActive);
      paragraph.style.animationDelay = isActive ? `${i * 300}ms` : '';
    });
  });

  nav.classList.add('-inverse');
  shade.classList.add('-reveal');
}

function closeShade() {
  navButtons.forEach((button, index) => {
    button.classList.remove('-active')
    navSections[index].classList.remove('-reveal')
  })

  nav.classList.remove('-inverse')
  shade.classList.remove('-reveal')
}

const titleChange = () => {
  let currentTitle = swapper.textContent.trim();
  let availableTitles = titles.filter(title => title !== currentTitle);
  let randomIndex = Math.floor(Math.random() * availableTitles.length);
  let randomTitle = availableTitles[randomIndex] + '.';
  const msWait = 150;
  let spaceCounter = 0;
  
  // Remove
  const animChars = document.querySelectorAll('.-animChar');
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
  }, (animChars.length - spaceCounter) * msWait);
  
  setTimeout(titleChange, ((randomTitle.length - spaceCounter) * msWait) + 3000);
}

titleChange();


//Emoji
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

logo.addEventListener('mousedown', async () => {
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

  const { left, top, width, height } = logo.getBoundingClientRect();
  emoji.style.left = `${left + (width / 2)}px`;
  emoji.style.top = `${top + (height / 2)}px`;

  document.body.appendChild(emoji);

  emoji.style.transition = `all 500ms cubic-bezier(0.42, 0, 0.58, 1)`;

  await delay(80);
  emoji.style.transform = `scale(20)`;

  await delay(920);
  emoji.style.transform = `scale(0)`;

  await delay(500);
  emoji.remove();
});
