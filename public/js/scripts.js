
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
  console.log(result)
  addProjectAsOption(result)
  addProjectToPage(result)
  name.value = ''
}

const addProjectToPage = (project) => {
  const projects = document.querySelector('.projects-container')
  projects.insertAdjacentHTML('beforeend', `
    <div class='project-div'>
      <p value=${project.id}>${project.name} 
        <i class="fa-trash-alt project-trash"></i>
      </p>
      <div>add associated palettes here</div>
    </div>
    `)
}

const addProjectAsOption = (project) => {
  const selection = document.querySelector('.project-select')
  selection.insertAdjacentHTML('afterbegin', `<option value=${project.id}>${project.name}</option>`)
}

const deleteProject = async(id) => {
  const project = document.querySelector('.project-div')
  const response = await fetch('/api/v1/projects', {
    method: 'DELETE'
  })
  const result = await response.json()
  console.log(result)
}

const addPalette = () => {
  event.preventDefault()
  console.log('add Palette Called')
}

$(".project-btn").on('click', addProject)

$(".project-trash").on('click', deleteProject)

$(".palette-btn").on('click', addPalette)

$(".save-btn").on('click', () => {
  console.log('save-btn clicked')
})

$(".update-btn").on('click', updateMultipleColors)

$(".retrieve-btn").on('click', () => {
  console.log('view saved Projects clicked')
})

$(".fas").on('click', toggleLock)

$(".change-btn").on('click', changeColor)

updateMultipleColors();
getProjects();

