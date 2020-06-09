const navButtons = document.querySelectorAll('button')
const navSections = document.querySelectorAll('section')
const shade = document.querySelector('div.shade')

let clickedButton = ""


navButtons.forEach(button => {
  button.addEventListener('click', () => {
    revealSection()
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

  shade.classList.add('-reveal')
  }
