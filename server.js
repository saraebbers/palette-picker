const environment = process.env.NODE_ENV || 'development';

const configuration = require('./knexfile')[environment];

const database = require('knex')(configuration)

const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('public'))
 
app.set('port', process.env.PORT || 3000)

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json( { error });
    });
});


app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for(let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected Format: { name: <string> }.  You are missing a "${requiredParameter}" property.`})
    }
  }
 database('projects').insert(project, 'id')
  .then(project => {
    response.status(201).json({ id: project[0]})
  })
  .catch(error => {
    response.status(500).json({error})
  })
})

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  database('palettes').where('project_id', request.params.id).select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json( { error });
    });
});

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for(let requiredParameter of ['name', 'project_id', 'color_zero', 'color_one', 'color_two', 'color_three', 'color_four']) {
    if(!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected Format: { name: <string> }.  You are missing a "${requiredParameter}" property.`})
    }
  }
  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0]})
    })
    .catch(error => {
      response.status(500).json({error})
    })
})

app.delete('/api/v1/projects/:id', (request, response) => {
  database('palettes').where('project_id', request.params.id).del()
  .then (() => {
    database('projects').where('id', request.params.id).del()
    .then(project => {
      response.status(200).json(`Project ${project[0]} was deleted`)
    })
    .catch(error => {
      response.status(500).json({error})
    })
  })
  //delete associated palettes prior to project
})

app.delete('/api/v1/projects/:id/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).del()
  .then(palette => {
     response.status(200).json(`Palette ${palette[0]} was deleted`)
  })
  .catch(error => {
    response.status(500).json({error})
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})
