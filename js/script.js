const navButton = document.querySelectorAll('button')
const shade = document.querySelector('div.shade')
let clickedButton = ""


for (i = 0; i < navButton.length; i++) {
  navButton[i].addEventListener('click', () =>
  revealSection()
)}

function revealSection() {
  let inactive = document.querySelectorAll('section')
  clickedButton = (event.target)

  for(i = 0; i < inactive.length; i++) {
     inactive[i].classList.remove('-reveal')
  }
  for(i = 0; i < navButton.length; i++) {
      navButton[i].classList.remove('-active')
  }

  clickedButton.classList.add('-active')
  
  let matchedSection = document.querySelector('section[content='+clickedButton.getAttribute('navTo')+']')
  

  matchedSection.classList.add('-reveal')
  shade.classList.add('-reveal')
  }
