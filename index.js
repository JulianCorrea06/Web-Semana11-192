const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

var people = [];

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/home.html');
});

app.get('/api/people', (request, response) => {
    response.send(people);
})

app.post('/api/people', (request, response) => {
    console.log(request.body);
    people.push(request.body);
    response.send({
        message: 'ok',
    });
});


app.delete('api/people', (request, response) =>{
    var index = request.body.indexToDelete;
people.splice(parseInt(index),1); //primero desde cuando voy a eliminar, segundo cuantos voy a eliminar
response.send({
    message: 'deleted',
});
});

app.put('/api/people',(request, response)=>{
  /*  var elementToEdit = people[0];
    elementToEdit.firstname = "nuevo nombre"
    elementToEdit.lastname = "nuevo apellido"*/

});

app.listen(3000, () => {
    console.log('listening');
});