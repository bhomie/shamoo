const navButtons = document.querySelectorAll('button.nav__button')
const navSections = document.querySelectorAll('section')
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

// Event listeners
navButtons.forEach(button => button.addEventListener('click', revealSection));

// Functions
function revealSection(e) {
  nav.classList.add('-inverse');
  shade.classList.add('-reveal');

  navButtons.forEach((button, index) => {
    const section = navSections[index];
    const isActive = e.target.getAttribute('navTo') === section.getAttribute('content');
    
    button.classList.toggle('-active', isActive);
    section.classList.toggle('-reveal', isActive);
    animateParagraphs(section, isActive);

    if (isActive && button.classList.contains('-active')) {
      button.removeEventListener('click', revealSection);
      button.addEventListener('click', closeShade);
    } else {
      button.removeEventListener('click', closeShade);
      button.addEventListener('click', revealSection);
    }
  });
}

function animateParagraphs(section, isActive) {
  const paragraphs = section.querySelectorAll('h2,p');
  paragraphs.forEach((paragraph, i) => {
    paragraph.classList.toggle('-fadeIn', isActive);
    paragraph.style.animationDelay = isActive ? `${i * 300}ms` : '';
  });
}

function closeShade() {
  navButtons.forEach((button, index) => {
    button.classList.remove('-active');
    navSections[index].classList.remove('-reveal');
  });
  //fix this in future - bug: clicking logo out of a shade will make the button unclickable
  navButtons.forEach(button => button.addEventListener('click', revealSection));

  nav.classList.remove('-inverse');
  shade.classList.remove('-reveal');
}

// Title Change
const titleChange = async () => {
  const currentTitle = swapper.textContent.trim();
  const availableTitles = titles.filter(title => title !== currentTitle);
  const randomTitle = availableTitles[Math.floor(Math.random() * availableTitles.length)] + '.';
  const msWait = 150;

  const animChars = document.querySelectorAll('.-animChar');
  animChars.forEach((char, i) => {
    char.style.animationDelay = `${(animChars.length - i) * 50}ms`;
    char.classList.add('-reverse');
  });

  await new Promise(resolve => setTimeout(resolve, (animChars.length) * msWait));
  swapper.innerHTML = randomTitle.split('').map((char, i) => char === ' ' ? `<span>${char}</span>` : `<span class="-animChar" style="animation-delay: ${i * 50}ms">${char}</span>`).join('');

  setTimeout(titleChange, (randomTitle.length * msWait) + 3000);
}

titleChange();

// Emoji
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

logo.addEventListener('mousedown', async () => {
  closeShade();
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

  const { left, top, width, height } = logo.getBoundingClientRect();
  emoji.style.left = `${left + (width / 2)}px`;
  emoji.style.top = `${top + (height / 2)}px`;

  document.body.appendChild(emoji);

  await delay(80);
  emoji.style.transform = `scale(20)`;

  await delay(920);
  emoji.style.transform = `scale(0)`;

  await delay(500);
  emoji.remove();
});
