/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Stack = mongoose.model('Stack'),
    _ = require('underscore');


/**
 * Find stack by id
 */

exports.stack = function(req, res, next, id){
  var User = mongoose.model('User')

  Stack.load(id, function (err, stack) {
    if (err) return next(err)
    if (!stack) return next(new Error('Failed to load stack ' + id))
    req.stack = stack
    next()
  })
}

/**
 * Create a stack
 */
exports.create = function (req, res) {
  var stack = new Stack(req.body)
  stack.user = req.user
  stack.save()
  res.jsonp(stack)
}

/**
 * Update a stack
 */
exports.update = function(req, res){
  var stack = req.stack
  stack = _.extend(stack, req.body)

  stack.save(function(err) {
  	res.jsonp(stack)
  })
}

/**
 * Delete an stack
 */
exports.destroy = function(req, res){
  var stack = req.stack
  stack.remove(function(err){
    if (err) {
		res.render('error', {status: 500});
	} else {			
		res.jsonp(stack);
	}
  })
}

/**
 * Show an stack
 */
exports.show = function(req, res){
  res.jsonp(req.stack);
};

/**
 * List of stacks
 */
exports.all = function(req, res){
	Stack.find().sort('-created').populate('user').exec(function(err, stacks) {
		if (err) {
			res.render('error', {status: 500});
		} else {			
      res.jsonp(stacks);
		}
	});
}

exports.allByUser = function(req, res){
  Stack.find({ 'user': req.user._id }).sort('-created').populate('user').exec(function(err, stacks) {
    if (err) {
      res.render('error', {status: 500});
    } else {      
        res.jsonp(stacks);
    }
  });
}