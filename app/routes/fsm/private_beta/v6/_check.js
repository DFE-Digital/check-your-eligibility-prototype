module.exports = function(router) { // Function to receive the router object

    // POST route example
    router.post('/FSM/Private_beta/v6/family/account/onegov-signin', (req, res) => {
        req.session.data.user = {};
        res.redirect('/account/enter-password');
    });

    // GET route example
    router.get('/', function(req, res) {
        res.send('Account Page');
    });


    //ready for account
    //router.get('v6/family/account/signout', (req, res) => {
      //  req.session.data.user = null
        //res.redirect('/signin-or-create')
    //})


//const express = require('express');
//const router = express.Router();


//exports close bracket
}




module.exports = function (router) { // Function to receive the router object

    // POST route example
    router.post('/FSM/Private_beta/v6/family/start-now', (req, res) => {
        req.session.data.user = {};
        res.redirect('/parent-soft-check/check');
    });

    // GET route example
    router.get('/', function(req, res) {
        res.send('check');
    });



//family//
//--parent-soft-check/check--//

// Do you have NI Number?
router.post('/FSM/Private_beta/v6-soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number']; // 'yes' or 'no'
    var enteredNiNumber = req.session.data['ni-number-entered']; // The NI number, if provided

    console.log('Selected NI Number Option:', niNumber);
    console.log('Entered NI Number:', enteredNiNumber);

    if (niNumber === "yes") {
        if (enteredNiNumber) {
            // If NI number is provided, go to
            res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/checking-loader');
        } else {
            // If NI number is missing, show error screen
            res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/error-ni');
        }
    } else {
        // Redirect to NASS number input page if "No" is selected
        res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/nass-number');
    }
  });

  //  ASR number input and redirects
  router.post('/nass-number-answer', function (req, res) {
    var nassNumber = req.session.data['nass-number']; // 'yes' or 'no'

    if (nassNumber === "yes") {
        // If NASS number is provided, go to
        res.redirect('/FSM/Private_beta/v6/checker-parent/childs-age');
    } else {
        // If NASS number is not provided, ask for more information
        res.redirect('/FSM/Private_beta/v6/checker-parent/more-info-required-asylum');
    }
  });
    module.exports = router;

//exports close bracket
}