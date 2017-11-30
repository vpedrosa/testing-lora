var express = require('express');
var cors = require ('cors');
var sqlite3 = require('sqlite3').verbose();
var app = express();
var db = new sqlite3.Database('bd_lora');

app.use(cors({origin: '*'}));

app.patch("/",function(req,res) {
	console.log(req.params.hola);
	res.status(200).json({"message":"ASD"});
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
 
const appID = "lorawan-testing-ugr"
const accessKey = "ttn-account-v2.BoT9PHZ5qkyITiy63InjeSGTYC7XnXyA_j28INhNMU8"
 
/*// discover handler and open mqtt connection
data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
    })
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
 
// discover handler and open application manager client
application(appID, accessKey)
  .then(function (client) {
    return client.get()
  })
  .then(function (app) {
    console.log("Got app", app)
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })*/

app.listen(3000);
