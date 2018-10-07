const express = require('express');
const Joi = require('joi'); 
const app = express();

// Use middleware
app.use(express.json());

//courses array
const courses = [
   {id: 1, name: 'course1'},
   {id: 2, name: 'course2'},
   {id: 3, name: 'course3'},

];

// get courses
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  if(!req.body.name || req.body.name.length < 3){
    //400 Bad Request
    res.status(400).send('Name is required and should be minimum 3 characters');
    return;
  }

  const course = {
     id: courses.length + 1,
     name: req.body.name
  };
  courses.push(course);
  res.send(course);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port} ...'));
