const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { getTodo, postTodo, patchTodo } = require('./toDoController');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.route('/todo').get(getTodo).post(postTodo);


app.route('/todo/:id').patch(patchTodo);

module.exports = app;