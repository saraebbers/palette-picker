
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

