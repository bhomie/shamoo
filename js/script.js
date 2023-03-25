const navButtons = document.querySelectorAll('button.nav__button')
const navSections = document.querySelectorAll('section')
const closeButtons = document.querySelectorAll('button.shadeContent__close')
const shade = document.querySelector('div.shade')
const nav = document.querySelector('nav')
const selector = document.querySelector('.swapper');
const logo = document.querySelector('.-logo');
const titles = ["hero of time", "dragon slayer", "mentor", "creator", "prompt writer", "dreamer", "vocaloid", "space cowboy", "game addict"];
const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "😛", "🤔", "🤨", 
  "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", 
  "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", 
  "😱", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤮", "🤧", "😇", "🤠", "🥳", "😈", "👿", "👹", 
  "👺", "💀", "👻", "👽", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
];

let currentTitle = "";
let index = 0;
let interval;

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

function revealSection(e){
  navButtons.forEach((button, index) => {
    if(e.target.getAttribute('navTo') == navSections[index].getAttribute('content')) {
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

function closeShade(){
  navButtons.forEach((button, index) => {
    button.classList.remove('-active')
    navSections[index].classList.remove('-reveal')
  })

  nav.classList.remove('-inverse')
  shade.classList.remove('-reveal')
}


const changeText = () => {
  if (index >= currentTitle.length) {
    clearInterval(interval);
    setTimeout(() => {
      const newTitle = titles[Math.floor(Math.random() * titles.length)];
      if (newTitle !== currentTitle) {
        currentTitle = newTitle;
        index = 0;
      }
      interval = setInterval(changeText, 80);
    }, 2000);
    return;
  }
  selector.innerHTML = currentTitle.substring(0, index + 1);
  index++;
};

interval = setInterval(changeText, 100);

logo.addEventListener('mousedown', () => {
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

  const { left, top, width, height } = logo.getBoundingClientRect();
  emoji.style.left = `${left + (width / 2) - 30}px`;
  emoji.style.top = `${top + (height / 2) - 30}px`;

  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = `scale(1.5)`;
    emoji.style.transition = `all 0.5s cubic-bezier(0.42, 0, 0.58, 1)`;
  }, 80);

  emoji.addEventListener('mouseleave', () => {
    emoji.style.transform = `scale(0)`;
    emoji.style.transition = `all 0.5s cubic-bezier(0.42, 0, 0.58, 1)`;

    setTimeout(() => {
      emoji.remove();
    }, 500);
  });
});