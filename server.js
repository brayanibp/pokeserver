const bodyParser  = require('body-parser');
const express = require('express');
const pokedb = require('./db/pokemon.json');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({'limit':'2mb'}));
app.disable('x-powered-by');

app.use(cors());
app.options('*', cors());

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/', function(req,res) {
	res.send('<h1><b> Hi </b></h1>');
});

//  http://10.200.48.163:3000/pokemon

app.get('/pokemon', function(req, res) {
	console.log("Request /pokemon \n");

	var pokeArr = [];
	
	for(i in pokedb) {
		
		pokeArr.push( 
			{
				"id":pokedb[i].id,
				"name":pokedb[i].name,
				"picture":pokedb[i].img
			}
		)
	}

	res.send(pokeArr)
	
});

app.get('/pokemon/:id', function(req, res) {	
	let idPoke = req.params.id;

	console.log("Request Pokemon -> El id: "+ idPoke + " es el #" + pokedb[idPoke].id + " " + pokedb[idPoke].name + "\n" );

	var pokeInfo = pokedb[idPoke];

	res.send(pokeInfo)

});

app.post('/register', function(req, res) {
	console.log(req.body)
	
	let name = req.body.name
	let lastName = req.body.lastName;
	let age	= req.body.age;
	let country = req.body.country;
	let city = req.body.city;
	
	let msg;

	if(name == "" || name == null || name == undefined) {
		jsBack = {
			"success":false,
			"messages":"El nombre se encuentra vacio."
		}
	}
	else if(lastName == "" || lastName == null || lastName == undefined) {
		jsBack = {
			"success":false,
			"messages":"El apellido se encuentra vacio."
		}
	}
	else if(age == "" || age == null || age == undefined) {
		jsBack = {
			"success":false,
			"messages":"La edad se encuentra vacia."
		}
	}
	else if(country == "" || country == null || country == undefined) {
		jsBack = {
			"success":false,
			"messages":"El pais se encuentra vacio."
		}
	}
	else if(city == "" || city == null || city == undefined) {
		jsBack = {
			"success":false,
			"messages":"La ciudad se encuentra vacia."
		}
	}
	else {
		jsBack = {
			"success":true,
			"messages":`El usuario ${name} ${lastName} con la edad de: ${age} y perteneciente a la ciudad: ${city} y ubicado en el pais ${country} ha logrado exitosamente el metodo POST`
		}
	}

	console.log(jsBack);
	res.send(jsBack);

});

module.exports.serverPort = app.listen(port, () => {
	console.log(`Servidor - http://localhost:${port}/`);
});

