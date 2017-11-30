var express = require('express');
var cors = require ('cors');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var db = new sqlite3.Database('bd_lora2');
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.patch("/",function(req,res,next) {
 db.get("UPDATE positions SET precision = "+req.body.precision+"," +
     " longitud = "+req.body.longitud+", latitud = "+req.body.latitud+" where ID = 1");


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
