module.exports = function(router) { 
    
    // POST route MVP2
    router.post('/mvp2/_family/account/onegov-signin', (req, res) => {
        req.session.data.user = {};
        res.redirect('/account/enter-password');
    });

    // GET route  MVP2
    router.get('/', function(req, res) {
        res.send('Account Page');
    });

     // POST route MVP3
     router.post('/mvp3/_family/account/onegov-signin', (req, res) => {
        req.session.data.user = {};
        res.redirect('/account/enter-password');
    });
       // GET route  MVP3
       router.get('/', function(req, res) {
        res.send('Account Page');
    });

    //ready for account
    //router.get('mvp3/_family/account/signout', (req, res) => {
      //  req.session.data.user = null
        //res.redirect('/signin-or-create')
    //})


//const express = require('express');
//const router = express.Router();

    
//exports close bracket   
}