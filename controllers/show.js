var mongoose = require('mongoose');
var Show  = mongoose.model('Show');

//GET - Retorna todos los registrados
exports.findAll = function(req, res) {
	Show.find(function(err, shows) {
    if(err) res.send(500, err.message);

    console.log('GET /shows')
	res.status(200).jsonp(shows);
	});
};

//GET - Retorna los registrados especificando la ID
exports.findById = function(req, res) {
	Show.findById(req.params.id, function(err, show) {
    if(err) return res.send(500, err.message);

    console.log('GET /shows/' + req.params.id);
		res.status(200).jsonp(show);
	});
};

//POST - Inserta un nuevo registro en la BD
exports.add = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var show = new Show({
		name:    req.body.name,
	});

	show.save(function(err, show) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(show);
	});
};

//PUT - Actualiza los registros ya existentes
exports.update = function(req, res) {
	Show.findById(req.params.id, function(err, show) {
		show.name   = req.body.name;
		show.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(show);
		});
	});
};

//DELETE - Elimina un registro especificando ID
exports.delete = function(req, res) {
	Show.findById(req.params.id, function(err, show) {
		show.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.json({ message: 'DELETE' });

