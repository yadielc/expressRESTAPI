const express = require('express');
const Joi = require('joi'); // library for validating data
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
  const schema = {
       name: Joi.string().min(3).required()

  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

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

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found');


    // Validate
    // If invalid, return 400 - Bad Request

    // Update course
    // Return the updated course
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port} ...'));
