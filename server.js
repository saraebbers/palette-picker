const express = require('express')
// this requires the Express module that was installed with NPM
const app = express()
// this sets up or Express application, with the app I can configure and add functionality to my server
const bodyParser = require('body-parser')

app.use(bodyParser.json())
//this is a piece of middleware for express that lets us read the body of a call as json

app.set('port', process.env.PORT || 3000)
// if this was running on production, there would be an environment port set already, this says, use that or if that isn't set/undefined, use port 3000
app.locals.title = 'Palette Picker';

app.locals.projects = [
  {
    id: 1,
    name: 'Spring',
    palettes: [
      {
        id: 11,
        name: 'beach',
        colors: [
          '#E9D758', '#297373', '#FF8552', '#E6E6E6', '#39393A'
        ]
      },
      {
        id: 12,
        name: 'ooh its green',
        colors: [
          '#ACECA1', '#96BE8C', '#629460', '#E6E6E6', '#39393A'
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Fall',
    palettes: [
      {
        id: 21,
        name: 'Miami',
        colors: [
          '#F1E8B8', '#F9E784', '#E58F65', '#DO5353', '#191919'
        ]
      },
      {
        id: 22,
        name: 'Sea Side',
        colors: [
          '#157F1F', '#4CB963', '#AOEADE', '#5C6784', '#1D263B'
        ]
      }
      ]
  }
]
//storage of data in a variable given to us by express.  Populated with fake data

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects
  return response.json( { projects })
});
//this route handler returns all the projects in json
// this is the route handler, app.get creates a route handler specifically listening for GET requests.  The first arguement is the route path. The second argument is a callback that take a request object and a response object.  The request object contains info about the request (such as headers, query parameters, and body) the response object contains info that my server will send as a response back to the client.  It also has functions that enables my server to send back a response.  The response.sendfunction sends a response with content in the body of the response.  

app.get('/api/v1/projects/:id', (request, response) => {
  const id = parseInt(request.params.id)
  const project = app.locals.projects.find(project => {
    return project.id === id
  })
  if (project) {
    response.status(200).json( { project })
  } else {
    return response.status(404).send({
      error: 'Project was not found, please try again with the correct information'
    })
  }
})
//this route handler is dynamic, it returns a specific project based on its id-- status code 200 is okay, 404 means not found

// app.post('/api/v1/projects', (request, response) => {
//   const id = Date.now()
//   const { project } = request.body

//   if (!project) {
//     return response.status(422).send({
//       error: 'No project property was provided, please try again with the information required'
//     })
//   } else {
//   app.locals.projects.push({...project, id})
//   return response.status(201).json( { id, project })
//   }
// })
//this route handler allows the user to create a new project with the correct info in the body-- status code 201 means created, 422 means unprocessable entity

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})
// app.listen() tells the server to listen for connections on the specified port