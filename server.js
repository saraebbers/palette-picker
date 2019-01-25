const environment = process.env.NODE_ENV || 'development';
//set var environment to be the string of dev or node environment
const configuration = require('./knexfile')[environment];
//setting the configuration to the key of the value of the var environment in the knex object
const database = require('knex')(configuration)
// calling knex with the configuration passed into the knex function

const express = require('express')
// this requires the Express module that was installed with NPM
const app = express()
// this sets up or Express application, with the app I can configure and add functionality to my server
const bodyParser = require('body-parser')

app.use(bodyParser.json())
//this is a piece of middleware for express that lets us read the body of a call as json

app.use(express.static('public'))
// app.use configures the application to use a middleware function.  basically for every request to the server, always run the function passed into app.use.  The express.static(public) part defines the path to our static assets.  it defines the directory to where the static files are stored.  

app.set('port', process.env.PORT || 3000)
// if this was running on production, there would be an environment port set already, this says, use that or if that isn't set/undefined, use port 3000
// app.locals.title = 'Palette Picker';

// app.locals.projects = [
//   {
//     id: 1,
//     name: 'Spring',
//     palettes: [
//       {
//         id: 11,
//         name: 'beach',
//         colors: [
//           '#E9D758', '#297373', '#FF8552', '#E6E6E6', '#39393A'
//         ]
//       },
//       {
//         id: 12,
//         name: 'ooh its green',
//         colors: [
//           '#ACECA1', '#96BE8C', '#629460', '#E6E6E6', '#39393A'
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: 'Fall',
//     palettes: [
//       {
//         id: 21,
//         name: 'Miami',
//         colors: [
//           '#F1E8B8', '#F9E784', '#E58F65', '#DO5353', '#191919'
//         ]
//       },
//       {
//         id: 22,
//         name: 'Sea Side',
//         colors: [
//           '#157F1F', '#4CB963', '#AOEADE', '#5C6784', '#1D263B'
//         ]
//       }
//       ]
//   }
// ]
//storage of data in a variable given to us by express.  Populated with fake data

// app.get('/', (request, response) => {
//   const options = {
//     root: 'public'
//   }
//   response.sendFile('index.html', options)
// })

// app.get('/api/v1/projects', (request, response) => {
//   const projects = app.locals.projects
//   return response.json( { projects })
// });
//this route handler returns all the projects in json
// this is the route handler, app.get creates a route handler specifically listening for GET requests.  The first arguement is the route path. The second argument is a callback that take a request object and a response object.  The request object contains info about the request (such as headers, query parameters, and body) the response object contains info that my server will send as a response back to the client.  It also has functions that enables my server to send back a response.  The response.sendfunction sends a response with content in the body of the response.  

// app.get('/api/v1/projects/:id', (request, response) => {
//   const id = parseInt(request.params.id)
//   const project = app.locals.projects.find(project => {
//     return project.id === id
//   })
//   if (project) {
//     response.status(200).json( { project })
//   } else {
//     return response.status(404).send({
//       error: `Project was not found with an id of ${id}, please try again with the correct information`
//     })
//   }
// })
//this route handler is dynamic, it returns a specific project based on its id-- status code 200 is okay, 404 means not found

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json( { error });
    });
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
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

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for(let requiredParameter of ['name', 'color_zero', 'color_one', 'color_two', 'color_three', 'color_four']) {
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

// app.delete('/api/v1/projects/:id', (request, response) => {
//   console.log('app.delete for projects')
//   const id = parseInt(request.params.id)
//   //delete associated palettes prior to project
// })

// app.delete('/api/v1/palettes/:id', (request, response) => {
//   console.log('app.delete for palettes')
// })



// app.post('/api/v1/projects', (request, response) => {
//   const id = Date.now()
//   const project = request.body

//   if (!project) {
//     return response.status(422).send({
//       error: `No name property was provided, please try again with the information required. Error ${error}`
//     })
//   } else {
//   app.locals.projects.push({...project, id})
//   return response.status(201).json( { id })
//   }
// })
//this route handler allows the user to create a new project with the correct info in the body-- status code 201 means created, 422 means unprocessable entity

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})
// app.listen() tells the server to listen for connections on the specified port