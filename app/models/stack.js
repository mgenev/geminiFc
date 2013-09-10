/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**
 * Article Schema
 */

//TODO try using different collection name here, like flashcard
// reference http://stackoverflow.com/questions/5794834/how-to-access-a-preexisting-collection-with-mongoose

var StackSchema = new Schema({
	created: {type : Date, default : Date.now},
	title: {type: String, default: '', trim : true},
	language1: {type: String, default: '', trim : true},
 	language2: {type: String, default: '', trim : true},
	user: {type : Schema.ObjectId, ref : 'User'}
  },
  {collection : 'stacks'}
);

/**
 * Statics
 */

StackSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('user').exec(cb);
  }
};
//TODO look up mongoose.model
mongoose.model('Stack', StackSchema);