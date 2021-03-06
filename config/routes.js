var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    app.param('userId', users.user)

    var stacks = require('../app/controllers/stacks')  
    app.get('/stacks', stacks.all)
    app.post('/stacks', auth.requiresLogin, stacks.create)
    app.get('/stacks/:stackId', stacks.show)
    app.put('/stacks/:stackId', auth.requiresLogin, auth.stack.hasAuthorization,  stacks.update)
    app.del('/stacks/:stackId', auth.requiresLogin, auth.stack.hasAuthorization,  stacks.destroy)

    app.get('/stacks/user/:userId', stacks.allByUser)

    app.param('stackId', stacks.stack)

    var articles = require('../app/controllers/articles')  
    app.get('/articles', articles.all)
    app.post('/articles', auth.requiresLogin, articles.create)
    app.get('/articles/:articleId', articles.show)
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update)
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy)

    app.get('/articles/stack/:stackId', articles.allByStack)

    app.param('articleId', articles.article)


    // home route
    var index = require('../app/controllers/index')
    app.get('/', index.render)

}