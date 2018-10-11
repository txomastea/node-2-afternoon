const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const PC = require('./products_controller');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(dbInstance => {
   // console.log('bd',process.env.CONNECTION_STRING )
   app.set('db', dbInstance);
 }).catch(error => {
     console.log('error connecting to the database', error)
 });

 app.post('/api/products', PC.create);
 app.get('/api/products', PC.getAll);
 app.get('/api/products/:id', PC.getOne);
 app.put('/api/products/:id', PC.update);
 app.delete('/api/products/:id', PC.delete);


const SERVER_PORT = 3000
app.listen(SERVER_PORT,() => {
    console.log(`listening on port ${SERVER_PORT} 👩‍💻`)
})