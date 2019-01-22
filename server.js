const express = require('express')
// this requires the Express module that was installed with NPM
const app = express()
// this sets up or Express application, with the app I can configure and add functionality to my server

app.set('port', process.env.PORT || 3000)
// if this was running on production, there would be an environment port set already, this says, use that or if that isn't set/undefined, use port 3000
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.send('Checking if it is connected correctly')
});
// this is the route handler, app.get creates a route handler specifically listening for GET requests.  The first arguement is the route path. The second argument is a callback that take a request object and a response object.  The request object contains info about the request (such as headers, query parameters, and body) the response object contains info that my server will send as a response back to the client.  It also has functions that enables my server to send back a response.  The response.sendfunction sends a response with content in the body of the response.  

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})
// app.listen() tells the server to listen for connections on the specified port