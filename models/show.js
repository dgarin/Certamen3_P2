var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({ 
 name: { type: String }
});

module.exports = mongoose.model('Show', showSchema);