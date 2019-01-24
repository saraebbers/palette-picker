
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => {
      return knex('projects').del()
      })
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Spring'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            {
              project_id: project[0],
              name: 'pretty greens',
              color_zero: '#ABC123',
              color_one: '#ADC133',
              color_two: '#AFC193',
              color_three: '#BBC123',
              color_four: '#BBC111',
            },
            {
              project_id: project[0],
              name: 'pretty pinks',
              color_zero: '#ABC444',
              color_one: '#ADC999',
              color_two: '#AAAAA1',
              color_three: '#B12133',
              color_four: '#987111',
            }
          ])
        })
        .then(() => {
          console.log('seeding complete')
        })
        .catch(error => {
          console.log(`error seeding data: ${error}`)
        })
      ])
    .catch(error => {
      console.log(`error seeding outside promise.all data: ${error}`)
    })
  })
};
