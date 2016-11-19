var express         = require("express");
var bodyParser      = require("body-parser");
var mongoose        = require('mongoose');
var methodOverride  = require("method-override");
var app             = express();

// Coneccion a la BD
mongoose.connect('mongodb://localhost/shows', function(err, res) {
  if(err) throw err;
  console.log('connect to database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Importando modelos y controladores
var models     = require('./models/show')(app, mongoose);
var showCtrl = require('./controllers/show');


var router = express.Router();

//Index -route
router.get('/', function(req, res) {
  res.send("Hola mundo");
});
app.use(router);

// API routes
var api = express.Router();

api.route('/shows')
  .get(showCtrl.findAll)
  .post(showCtrl.add);

api.route('/shows/:id')
  .get(showCtrl.findById)
  .put(showCtrl.update)
  .delete(showCtrl.delete);

app.use('/api', api);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
