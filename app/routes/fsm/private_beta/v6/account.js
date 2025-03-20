module.exports = function(router) {


//account
     // POST route FSM/Private_beta/v6
     router.post('/FSM/Private_beta/v6/family/account/onegov-signin', (req, res) => {
        req.session.data.user = {};
        res.redirect('/account/enter-password');
    });
       // GET route  FSM/Private_beta/v6
       router.get('/', function(req, res) {
        res.send('Account Page');
    });

    // // POST route V6
    // router.post('/FSM/Private_beta/v6/family/account/onegov-signin', (req, res) => {
    //     req.session.data.user = {};
    //     res.redirect('/account/enter-password');
    // });

    // // GET route  V6
    // router.get('/', function(req, res) {
    //     res.send('Account Page');
    // });

    //  // POST route v6
    //  router.post('/FSM/Private_beta/v6/family/account/onegov-signin', (req, res) => {
    //     req.session.data.user = {};
    //     res.redirect('/account/enter-password');
    // });
    //    // GET route  v6
    //    router.get('/', function(req, res) {
    //     res.send('Account Page');
    // });

    //ready for account
    //router.get('FSM/Private_beta/v6/family/account/signout', (req, res) => {
      //  req.session.data.user = null
        //res.redirect('/signin-or-create')
    //})


//const express = require('express');
//const router = express.Router();


//exports close bracket
}