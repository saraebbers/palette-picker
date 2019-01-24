let projectsData = [
  {
    name: 'Spring',
    palettes: [
      {
        name: 'beach',
        color_zero: '#E9D758', 
        color_one: '#297373', 
        color_two: '#FF8552', 
        color_three: '#E6E6E6', 
        color_four: '#39393A'
      },
      {
        name: 'ooh its green',
        color_zero: '#E9D758', 
        color_one: '#297373', 
        color_two: '#FF8552', 
        color_three: '#E6E6E6', 
        color_four: '#39393A'
      }
    ]
  },
  {
    name: 'Fall',
    palettes: [
      {
        name: 'Miami',
        color_zero: '#E9D758', 
        color_one: '#297373', 
        color_two: '#FF8552', 
        color_three: '#E6E6E6', 
        color_four: '#39393A'
      },
      {
        name: 'Sea Side',
        color_zero: '#E9D758', 
        color_one: '#297373', 
        color_two: '#FF8552', 
        color_three: '#E6E6E6', 
        color_four: '#39393A'
      }
    ]
  }
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name, 
  }, 'id')
  .then(projectId => {
    let palettePromises = [];

    project.palettes.forEach(palette => {
      palettePromises.push(
        createPalette(knex, {
          project_id: projectId[0],
          name: palette.name,
          color_zero: palette.color_zero, 
          color_one: palette.color_one, 
          color_two: palette.color_two, 
          color_three: palette.color_three, 
          color_four: palette.color_four
        }, 'id')
      )
    });
    return Promise.all(palettePromises)
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
}

exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];
      projectsData.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });
      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
}

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('palettes').del()
//     .then(() => {
//       return knex('projects').del()
//       })
//     .then(() => {
//       return Promise.all([
//         knex('projects').insert({
//           name: 'Spring'
//         }, 'id')
//         .then(project => {
//           return knex('palettes').insert([
//             {
//               project_id: project[0],
//               name: 'pretty greens',
//               color_zero: '#ABC123',
//               color_one: '#ADC133',
//               color_two: '#AFC193',
//               color_three: '#BBC123',
//               color_four: '#BBC111',
//             },
//             {
//               project_id: project[0],
//               name: 'pretty pinks',
//               color_zero: '#ABC444',
//               color_one: '#ADC999',
//               color_two: '#AAAAA1',
//               color_three: '#B12133',
//               color_four: '#987111',
//             }
//           ])
//         })
//         .then(() => {
//           console.log('seeding complete')
//         })
//         .catch(error => {
//           console.log(`error seeding data: ${error}`)
//         })
//       ])
//     .catch(error => {
//       console.log(`error seeding outside promise.all data: ${error}`)
//     })
//   })
// };
