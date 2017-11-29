var express = require('express');
var cors = require ('cors');
var sqlite3 = require('sqlite3').verbose();
var app = express();
var db = new sqlite3.Database('bd_lora');
app.use(cors({origin: '*'}));

app.post("/",function(req,res) {
	res.status(200).json({"message":"Guardado"});
});

app.get("/",function(req,res) {
	res.setHeader('Context-Type','application/json');

	db.serialize(function() {
		db.get("SELECT ID, precision, latitud, longitud FROM positions LIMIT 1",function(err, row) {
			res.json({
			  "ID": row.ID,
			  "precision": row.precision,
			  "latitud": row.latitud,
			  "longitud": row.longitud
			});
		});
	});
});

app.listen(3000);
