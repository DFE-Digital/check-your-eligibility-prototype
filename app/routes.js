// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require('govuk-prototype-kit');
const express = require('express');
const router = govukPrototypeKit.requests.setupRouter(); // Create a router from the prototype kit
const path = require('path');

// Add your routes here - above the module.exports line

const _ = require('lodash')
//const express = require('express')
const { fakerEN_GB: faker } = require('@faker-js/faker')
//const moment = require('moment')
//const path = require('path')
router.use('/data', express.static(path.join(__dirname, '../data'))); // Adjust the path as necessary

// Serve static files
//app.use('/mvp3/_school/school-manage/upload', express.static(path.join(__dirname, 'mvp3/_school/school-manage/upload/upload-evidence')));

const url = require('url')
const fs = require('fs')

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// mvp3 Pass the router to the routes folder
require('./routes/mvp3/account')(router);
require('./routes/mvp3/softCheck')(router);
require('./routes/mvp3/appeal')(router);
require('./routes/mvp3/success')(router);
require('./routes/mvp2/betacheck')(router);

//v6 Pass the router to the routes folder
require('./routes/fsm/private_beta/v6/betacheck')(router);
require('./routes/fsm/private_beta/v6/softCheck')(router);
const softCheckRoutes = require('./routes/fsm/private_beta/v6/softCheck');
softCheckRoutes(router);

//v7 Pass the router to the routes folder
require('./routes/fsm/private_beta/v7/batch-check');

// v7 Require the batch-check route
const batchCheckRouteV7 = require('./routes/fsm/private_beta/v7/batch-check');

// Use the batch-check route
router.use(batchCheckRouteV7);

const softCheckRoutesV7_1_new = require('./routes/fsm/private_beta/v7-1/softCheck');
softCheckRoutesV7_1_new(router);

// const appealRoutes = require('./routes/mvp3/appeal');
// appealRoutes(router);

//v7-1
const appealRoutes = require('./routes/fsm/private_beta/v7-1/appeal');
appealRoutes(router);
require('./routes/fsm/private_beta/v7-1/batch-check');
// Require the batch-check route
const batchCheckRouteV7_1 = require('./routes/fsm/private_beta/v7-1/batch-check');

// Use the batch-check route
router.use(batchCheckRouteV7_1);

// const appealRoutes = require('./routes/fsm/private_beta/7-1/appeal');
// appealRoutes(router);

require('./routes/fsm/private_beta/v7-1/appeal')(router);
require('./routes/fsm/private_beta/v7-1/betacheck')(router);
require('./routes/fsm/private_beta/v7-1/softcheck-admin')(router);


router.get('*', function (req, res, next) {


//v7-3
require('./routes/fsm/private_beta/v7-3/appeal-decision')(router);






  //////////////////////////////
  // LOCAL FUNCTIONS AND DATA //
  // These functions are available on all pages in the prototype.
  // To use call the function inside curly brackets, for example {{ example_function() }}
  // Examples of date
  //
  // {{ date() }} shows todays date in the format 5 May 2022
  // {{ date({day: 'numeric', month: 'numeric', year: 'numeric'}) }} shows todays date in the format 05/05/2022
  // {{ date({day: 'numeric'}) }} shows the just the date of date, 5
  // {{ date({day: '2-digit'}) }} shows the date with a leading zero, 05
  // {{ date({day: 'numeric'}, {'day': -1}) }} shows just the date of yesterday
  // {{ date({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) }} shows todays date in the format Tuesday, 5 July 2022.
  // {{ date({day: 'numeric', month: 'numeric', year: 'numeric'}, {'day': +2}) }}

  res.locals.date = function (format = { day: 'numeric', month: 'long', year: 'numeric' }, diff = { 'year': 0, 'month': 0, 'day': 0 }) {

    var date = new Date();
    if ('day' in diff) {
      date.setDate(date.getDate() + diff.day)
    }
    if ('month' in diff) {
      date.setMonth(date.getMonth() + diff.month)
    }
    if ('year' in diff) {
      date.setYear(date.getFullYear() + diff.year)
    }
    const formattedDate = new Intl.DateTimeFormat('en-GB', format).format(date);
    return `${formattedDate}`
  }

  // Examples of today
  //
  // Useful for pre-populating date fields
  //
  // {{ today().day }} shows just todays day
  // {{ today().month }} shows just todays month as a number
  // {{ today().year }} shows just todays year as a number
  res.locals.today = () => (
    {
      "day": res.locals.date({ 'day': 'numeric' }),
      "month": res.locals.date({ 'month': 'numeric' }),
      "year": res.locals.date({ 'year': 'numeric' })
    }
  )

  // Examples of yesterday
  //
  // Useful for pre-populating date fields
  //
  // {{ yesterday().day }} shows just todays day
  // {{ yesterday().month }} shows just todays month as a number
  // {{ yesterday().year }} shows just todays year as a number
  res.locals.yesterday = () => (
    {
      "day": res.locals.date({ 'day': 'numeric' }, diff = { 'day': -1 }),
      "month": res.locals.date({ 'month': 'numeric' }, diff = { 'day': -1 }),
      "year": res.locals.date({ 'year': 'numeric' }, diff = { 'day': -1 })
    }
  )

  next()
})
/////////////////////////
// LOCAL FOLDER ROUTES //
/////////////////////////

// MVP2
//require('./views/mvp2/_routes');

// MVP2
//require('./views/mvp2/_routes');

// CURRENT
//require('./views/current/_routes');

// MVP1
//require('./views/mvp1/_routes');

// V1
// Include version 1 routes
//require('./routes/v1');
//require('./views/v1/_routes');
module.exports = router;


// Childcare routes //

// Childcare v3

// Route for create foster family add partner details

router.post('/childcare/v3/foster/create/partner-details', function (req, res) {

  var carerPartner = req.session.data['add-partner']
  if (carerPartner == "Yes") {
    res.redirect("/childcare/v3/foster/create/partner-details")

}

else {
    res.redirect("/childcare/v3/foster/create/child-details")
}
})

// Childcare v4

// Route for create foster family add partner details

router.post('/childcare/v4/foster/create/partner-details', function(req, res) {

var carerPartner = req.session.data['add-partner']
if (carerPartner == "Yes"){
    res.redirect("/childcare/v4/foster/create/partner-details")
}

else {
    res.redirect("/childcare/v4/foster/create/child-details")
}
})


// Route for showing application submitted on date in foster family code creation
router.post('/childcare/v4/foster/create/submitted-date', function(req, res) {
var confirmDateDay = req.session.data['confirmed-date-day']
var confirmDateMonth = req.session.data['confirmed-date-month']

if (confirmDateDay >= 1 && confirmDateDay <= 14) {
    res.redirect("/childcare/v4/foster/create/submitted-date")
}
else {
    res.redirect("/childcare/v4/foster/create/check-details")
}
})




// ////////////////////////CURRENT//////////////////////////////////


// // Asylum number
// router.post('/asylum-answer', function (req, res) {

//   // Make a variable
//   var seekingAsylum = req.session.data['seeking-asylum']

//   // Check whether the variable matches a condition
//   if (seekingAsylum == "yes") {
//     // Send user to next page
//     res.redirect('/current/checker-parent/nass-number')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker-parent/more-info-required-asylum')
//   }

// })

// // NASS number
// router.post('/nass-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['nass-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/current/checker-parent/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker-parent/more-info-required-asylum')
//   }

// })

// // NI number
// router.post('/ni-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/current/checker-parent/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker-parent/nass-number')
//   }

// })


// // SCHOOLS AND COUNCIL JOURNEYS
// //


// // Nationality / CHECKER /
// router.post('/council-checker-nationality-answer', function (req, res) {

//   // Make a variable
//   var whatNationality = req.session.data['what-nationality']

//   // Check whether the variable matches a condition
//   if (whatNationality == "british") {
//     // Send user to next page
//     res.redirect('/current/checker/national-insurance')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker/asylum-seeker')
//   }

// })


// // Asylum number CHECKER
// router.post('/council-checker-asylum-answer', function (req, res) {

//   // Make a variable
//   var seekingAsylum = req.session.data['seeking-asylum']

//   // Check whether the variable matches a condition
//   if (seekingAsylum == "yes") {
//     // Send user to next page
//     res.redirect('/current/checker/nass-number')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker/check-answers')
//   }

// })



// // NASS number CHECKER
// router.post('/council-nass-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['nass-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/current/checker/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker/ineligible')
//   }

// })


// // NI number CHECKER
// router.post('/council-ni-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/current/checker/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/current/checker/nass-number')
//   }

// })

// //
// // NI number
// router.post('/ni-number-check', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/current/parent-soft-check/eligible')
//   } else {
//     // Send user to other page
//     res.redirect('/current/parent-soft-check/nass-number')
//   }

// })

// // Soft CHECKER
// router.post('/soft-check-ni-answer', function (req, res) {

//   //Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/current/parent-soft-check/checking-loader')
//   } else {
//     // Send user to other page
//     res.redirect('/current/parent-soft-check/nass-number')
//   }

// })



// // NASS number
// router.post('/nass-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['nass-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/checker-parent/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/checker-parent/more-info-required-asylum')
//   }

// })

// // NI number
// router.post('/ni-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/checker-parent/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/checker-parent/nass-number')
//   }

// })


// // SCHOOLS AND COUNCIL JOURNEYS
// //


// // Nationality / CHECKER /
// router.post('/council-checker-nationality-answer', function (req, res) {

//   // Make a variable
//   var whatNationality = req.session.data['what-nationality']

//   // Check whether the variable matches a condition
//   if (whatNationality == "british") {
//     // Send user to next page
//     res.redirect('/mvp1/checker/national-insurance')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/checker/asylum-seeker')
//   }

// })


// // Asylum number CHECKER
// router.post('/council-checker-asylum-answer', function (req, res) {

//   // Make a variable
//   var seekingAsylum = req.session.data['seeking-asylum']

//   // Check whether the variable matches a condition
//   if (seekingAsylum == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/checker/nass-number')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/checker/check-answers')
//   }

// })


// // NASS number CHECKER
// router.post('/council-nass-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['nass-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/checker/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/checker/ineligible')
//   }

// })


// // NI number CHECKER
// router.post('/council-ni-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/checker/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/checker/nass-number')
//   }

// })

// //
// // NI number
// router.post('/ni-number-check', function (req, res) {
//   // Make a variable
//   var nassNumber = req.session.data['ni-number']
//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/parent-soft-check/eligible')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/parent-soft-check/nass-number')
//   }

// })

// /// Soft CHECKER//- relink to new routes folder //routes/mvp1/softCheck.js
// router.post('/mvp1-soft-check-ni-answer', function (req, res) {
//   // Make a variable
//   var nassNumber = req.session.data['ni-number']
//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp1/parent-soft-check/checking-loader')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp1/parent-soft-check/nass-number')
//   }
// })

// router


// ////////////////////////////////mvp2///////////////////////////////

// // Nationality
// router.post('/nationality-answer', function (req, res) {

//   // Make a variable
//   var whatNationality = req.session.data['what-nationality']

//   // Check whether the variable matches a condition
//   if (whatNationality == "british") {
//     // Send user to next page
//     res.redirect('/mvp2/checker-parent/national-insurance')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker-parent/asylum-seeker')
//   }

// })

// // Asylum number
// router.post('/asylum-answer', function (req, res) {

//   // Make a variable
//   var seekingAsylum = req.session.data['seeking-asylum']

//   // Check whether the variable matches a condition
//   if (seekingAsylum == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/checker-parent/nass-number')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker-parent/more-info-required-asylum')
//   }

// })

// // NASS number
// router.post('/nass-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['nass-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/checker-parent/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker-parent/more-info-required-asylum')
//   }

// })

// // NI number
// router.post('/ni-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/checker-parent/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker-parent/nass-number')
//   }

// })

// //////////////////////////////////
// // SCHOOLS AND COUNCIL JOURNEYS //
// //////////////////////////////////


// // Nationality / CHECKER /
// router.post('/council-checker-nationality-answer', function (req, res) {

//   // Make a variable
//   var whatNationality = req.session.data['what-nationality']

//   // Check whether the variable matches a condition
//   if (whatNationality == "british") {
//     // Send user to next page
//     res.redirect('/mvp2/checker/national-insurance')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker/asylum-seeker')
//   }

// })


// // Asylum number CHECKER
// router.post('/council-checker-asylum-answer', function (req, res) {

//   // Make a variable
//   var seekingAsylum = req.session.data['seeking-asylum']

//   // Check whether the variable matches a condition
//   if (seekingAsylum == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/checker/nass-number')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker/check-answers')
//   }

// })



// // NASS number CHECKER
// router.post('/council-nass-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['nass-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/checker/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker/ineligible')
//   }

// })


// // NI number CHECKER
// router.post('/council-ni-number-answer', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/checker/childs-age')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/checker/nass-number')
//   }

// })

// //
// // NI number
// router.post('/ni-number-check', function (req, res) {

//   // Make a variable
//   var nassNumber = req.session.data['ni-number']

//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/parent-soft-check/eligible')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/parent-soft-check/nass-number')
//   }
// })

// /// Soft CHECKER
// router.post('/mvp2-soft-check-ni-answer', function (req, res) {
//   // Make a variable
//   var nassNumber = req.session.data['ni-number']
//   // Check whether the variable matches a condition
//   if (nassNumber == "yes") {
//     // Send user to next page
//     res.redirect('/mvp2/parent-soft-check/checking-loader')
//   } else {
//     // Send user to other page
//     res.redirect('/mvp2/parent-soft-check/nass-number')
//   }
// })


// ///Privatebetachoice///
// router.post('/mvp2-betacheck', function (req, res) {
//   // Make a variable
//   var betaschool = req.session.data['beta-school']
//   // Check whether the variable matches a condition
//   if (betaschool == "Yes") {
//     // Send user to next page
//     res.redirect('/mvp2/parent-soft-check/check.html')
//   } else {
//     // Send user to a different page for physical evidence
//     res.redirect('/mvp2/parent-soft-check/account/beta-school-check-no.html');
//   }
// })


// ///WorkingMVP3///

// //  /// Soft CHECKER
// //  router.post('/mvp3_v1/_family/soft-check-ni-answer', function (req, res) {
// //   // Make a variable
// //   var nassNumber = req.session.data['ni-number']
// //   // Check whether the variable matches a condition
// //  if (nassNumber == "yes"){
// //     // Send user to next page
// //     res.redirect('/mvp3/_family/parent-soft-check/checking-loader')
// //   } else {
// //     // Send user to other page
// //    res.redirect('/mvp3/_family/parent-soft-check/nass-number')
// //  }
// // })


// //account
// // POST route mvp3
// router.post('/mvp3_v1/_family/account/onegov-signin', (req, res) => {
//   req.session.data.user = {};
//   res.redirect('/account/enter-password');
// });
// // GET route  MVP3
// router.get('/', function (req, res) {
//   res.send('Account Page');
// });


// /////////////



// ////pagination/////

// const getPaginatedResults = require('./routes/mvp3/pagination');
// router.get('/applications', getPaginatedResults);

module.exports = router;