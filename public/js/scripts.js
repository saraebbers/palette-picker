
const getRandomValue = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const generateHexValue = () => {
  let hexValue = ''
  const hexIndexValue =['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  while (hexValue.length < 6) { 
    let newValue = getRandomValue(16)
    hexValue = hexValue + hexIndexValue[newValue]
  }
  return hexCode = `#${hexValue}`
}

const updateMultipleColors = () => {
    let unlockedColors = $(".fa-lock-open")
    unlockedColors.each(item => {
      const newHex = generateHexValue()
      unlockedColors[item].parentNode.style = `background-color: ${newHex}`
      unlockedColors[item].innerText = ` ${newHex}`
    })
}
 
const toggleLock = () => {
  if($(event.target).hasClass('fa-lock-open')) {
     $(event.target).removeClass("fa-lock-open").addClass("fa-lock")
  } else {
    $(event.target).removeClass("fa-lock").addClass("fa-lock-open")
   }
}

const changeColor = () => {
  if($(event.target).siblings().hasClass('fa-lock-open')) {
    const newHex = generateHexValue()
    $(event.target).parent().css({"background-color": `${newHex}`})
    $(event.target).siblings().text(` ${newHex}`)
  }
}

const getProjects = async() => {
  const response = await fetch('/api/v1/projects')
  const result = await response.json()
  result.forEach(project => {
    addProjectAsOption(project)
    addProjectToPage(project)
  })
}

const addProject = async() => {
  event.preventDefault()
  const name = document.querySelector('.project-name')
  const response = await fetch('/api/v1/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ name: name.value })
  })
  const result = await response.json()
  addProjectAsOption(result)
  addProjectToPage(result)
  name.value = ''
}

const addProjectToPage = (project) => {
  const projects = document.querySelector('.projects-container')
  projects.insertAdjacentHTML('beforeend', `<div class="project-div"><p id="${project.id}">${project.name}<i class="far fa-trash-alt project-trash"></i></p><div>associated palettes here</div></div>`
    )
}

const addProjectAsOption = (project) => {
  const selection = document.querySelector(".project-select")
  selection.insertAdjacentHTML('afterbegin', `<option value=${project.id}>${project.name}</option>`)
}

const deleteProject = async() => {
  const project = document.querySelector('.projects-container')
  let id = event.target.parentNode.id
  event.target.parentNode.parentNode.remove()
  const response = await fetch(`/api/v1/projects/${id}`, {
    method: 'DELETE'
  })
  const result = await response.json()
}

const savePalette = async() => {
  event.preventDefault()
  const name = document.querySelector(".palette-input")
  const project = document.querySelector("option")
  let colorPalette = []
  const colors = document.querySelectorAll(".box")
  colors.forEach(color => {
    let thisColor = ''
    let i = 1
    while (thisColor.length < 7) {
      thisColor = thisColor + color.innerText[i]
      i++
    }
    colorPalette.push(thisColor)
  })
  const response = await fetch('/api/v1/palettes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name.value,
      project_id: project.value,
      color_zero: colorPalette[0],
      color_one: colorPalette[1],
      color_two: colorPalette[2],
      color_three: colorPalette[3],
      color_four: colorPalette[4],
    })
  })
  const result = await response.json()
  console.log(result)
}

$(".project-btn").on('click', addProject)

$(".projects-container").on('click', deleteProject)

$(".palette-btn").on('click', savePalette)

$(".save-btn").on('click', () => {
  console.log('save-btn clicked')
})

$(".update-btn").on('click', updateMultipleColors)

$(".retrieve-btn").on('click', getProjects)

$(".fas").on('click', toggleLock)

$(".change-btn").on('click', changeColor)

updateMultipleColors();

