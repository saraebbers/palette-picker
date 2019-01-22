const express = require('express')
// this requires the Express module that was installed with NPM
const app = express()
// this sets up or Express application, with the app I can configure and add functionality to my server

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
        id: 11,
        name: 'ooh its green',
        colors: [
          '#ACECA1', '#96BE8C', '#629460', '#E6E6E6', '#39393A'
        ]
      }
    ]
  },
  {
    id: 1,
    name: 'Fall',
    palettes: [
      {
        id: 11,
        name: 'Miami',
        colors: [
          '#F1E8B8', '#F9E784', '#E58F65', '#DO5353', '#191919'
        ]
      },
      {
        id: 11,
        name: 'Sea Side',
        colors: [
          '#157F1F', '#4CB963', '#AOEADE', '#5C6784', '#1D263B'
        ]
      }
      ]
  }
]
//storage of data in a variable given to us by express.  Populated with fake data

app.get('/', (request, response) => {
  response.send('Checking if it is connected correctly')
});
// this is the route handler, app.get creates a route handler specifically listening for GET requests.  The first arguement is the route path. The second argument is a callback that take a request object and a response object.  The request object contains info about the request (such as headers, query parameters, and body) the response object contains info that my server will send as a response back to the client.  It also has functions that enables my server to send back a response.  The response.sendfunction sends a response with content in the body of the response.  

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})
// app.listen() tells the server to listen for connections on the specified port