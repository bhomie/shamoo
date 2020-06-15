const navButtons = document.querySelectorAll('button.nav__button')
const navSections = document.querySelectorAll('section')
const closeButtons = document.querySelectorAll('button.shadeContent__close')
const shade = document.querySelector('div.shade')
const nav = document.querySelector('nav')

let clickedButton = ""


navButtons.forEach(button => {
  button.addEventListener('click', () => {
    revealSection()
  })
})

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closeShade()
  })
})

function revealSection() {
  clickedButton = event.target

  navButtons.forEach((button, index) => {
    if(clickedButton.getAttribute('navTo') == navSections[index].getAttribute('content')) {
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
