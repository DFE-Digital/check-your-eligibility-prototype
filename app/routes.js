//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.get('*', function (req, res, next) {

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
  res.locals.date = function (format = {day: 'numeric', month: 'long', year: 'numeric'}, diff = {'year': 0, 'month': 0, 'day': 0}) {
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
    {"day": res.locals.date({'day': 'numeric'}),
           "month": res.locals.date({'month': 'numeric'}),
           "year": res.locals.date({'year': 'numeric'})}
  )

  // Examples of yesterday
  //
  // Useful for pre-populating date fields
  //
  // {{ yesterday().day }} shows just todays day
  // {{ yesterday().month }} shows just todays month as a number
  // {{ yesterday().year }} shows just todays year as a number
 res.locals.yesterday = () => (
    {"day": res.locals.date({'day': 'numeric'}, diff = {'day': -1}),
            "month": res.locals.date({'month': 'numeric'}, diff = {'day': -1}),
            "year": res.locals.date({'year': 'numeric'}, diff = {'day': -1})}
   )

 next()
})
/////////////////////////
// LOCAL FOLDER ROUTES //
/////////////////////////

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// CURRENT 
require('./views/current/_routes');

// V1 
// Include version 1 routes
require('./views/v1/_routes');

module.exports = router;


////////////////////////CURRENT//////////////////////////////////

// Nationality
router.post('/nationality-answer', function (req, res) {

  // Make a variable 
  var whatNationality = req.session.data['what-nationality']

  // Check whether the variable matches a condition
  if (whatNationality == "british"){
    // Send user to next page
    res.redirect('/current/checker-parent/national-insurance')
  } else {
    // Send user to other page
    res.redirect('/current/checker-parent/asylum-seeker')
  }

})

// Asylum number
router.post('/asylum-answer', function (req, res) {

  // Make a variable 
  var seekingAsylum = req.session.data['seeking-asylum']

  // Check whether the variable matches a condition
  if (seekingAsylum == "yes"){
    // Send user to next page
    res.redirect('/current/checker-parent/nass-number')
  } else {
    // Send user to other page
    res.redirect('/current/checker-parent/more-info-required-asylum')
  }

})

  // NASS number
  router.post('/nass-number-answer', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['nass-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/current/checker-parent/childs-age')
    } else {
      // Send user to other page
      res.redirect('/current/checker-parent/more-info-required-asylum')
    }
  
  })

   // NI number
   router.post('/ni-number-answer', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['ni-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/current/checker-parent/childs-age')
    } else {
      // Send user to other page
      res.redirect('/current/checker-parent/nass-number')
    }
  
  })


// SCHOOLS AND COUNCIL JOURNEYS
//


// Nationality / CHECKER /
router.post('/council-checker-nationality-answer', function (req, res) {

// Make a variable 
var whatNationality = req.session.data['what-nationality']

// Check whether the variable matches a condition
if (whatNationality == "british"){
  // Send user to next page
  res.redirect('/current/checker/national-insurance')
} else {
  // Send user to other page
  res.redirect('/current/checker/asylum-seeker')
}

})


// Asylum number CHECKER
router.post('/council-checker-asylum-answer', function (req, res) {

  // Make a variable 
  var seekingAsylum = req.session.data['seeking-asylum']

  // Check whether the variable matches a condition
  if (seekingAsylum == "yes"){
    // Send user to next page
    res.redirect('/current/checker/nass-number')
  } else {
    // Send user to other page
    res.redirect('/current/checker/check-answers')
  }

})



// NASS number CHECKER
router.post('/council-nass-number-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['nass-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/current/checker/childs-age')
  } else {
    // Send user to other page
    res.redirect('/current/checker/ineligible')
  }

})


 // NI number CHECKER
 router.post('/council-ni-number-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['ni-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/current/checker/childs-age')
  } else {
    // Send user to other page
    res.redirect('/current/checker/nass-number')
  }

})

//
  // NI number
  router.post('/ni-number-check', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['ni-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/current/parent-soft-check/eligible')
    } else {
      // Send user to other page
      res.redirect('/current/parent-soft-check/nass-number')
    }
  
  })

   // Soft CHECKER
router.post('/soft-check-ni-answer', function (req, res) {

 //Make a variable 
 var nassNumber = req.session.data['ni-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
  res.redirect('/current/parent-soft-check/checking-loader')
  } else {
    // Send user to other page
   res.redirect('/current/parent-soft-check/nass-number')
  }

})

////////////////////////////////mvp1///////////////////////////////

// Nationality
router.post('/nationality-answer', function (req, res) {

  // Make a variable 
  var whatNationality = req.session.data['what-nationality']

  // Check whether the variable matches a condition
  if (whatNationality == "british"){
    // Send user to next page
    res.redirect('/mvp1/checker-parent/national-insurance')
  } else {
    // Send user to other page
    res.redirect('/mvp1/checker-parent/asylum-seeker')
  }

})

// Asylum number
router.post('/asylum-answer', function (req, res) {

  // Make a variable 
  var seekingAsylum = req.session.data['seeking-asylum']

  // Check whether the variable matches a condition
  if (seekingAsylum == "yes"){
    // Send user to next page
    res.redirect('/mvp1/checker-parent/nass-number')
  } else {
    // Send user to other page
    res.redirect('/mvp1/checker-parent/more-info-required-asylum')
  }

})

  // NASS number
  router.post('/nass-number-answer', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['nass-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/mvp1/checker-parent/childs-age')
    } else {
      // Send user to other page
      res.redirect('/mvp1/checker-parent/more-info-required-asylum')
    }
  
  })

   // NI number
   router.post('/ni-number-answer', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['ni-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/mvp1/checker-parent/childs-age')
    } else {
      // Send user to other page
      res.redirect('/mvp1/checker-parent/nass-number')
    }
  
  })


// SCHOOLS AND COUNCIL JOURNEYS
//


// Nationality / CHECKER /
router.post('/council-checker-nationality-answer', function (req, res) {

// Make a variable 
var whatNationality = req.session.data['what-nationality']

// Check whether the variable matches a condition
if (whatNationality == "british"){
  // Send user to next page
  res.redirect('/mvp1/checker/national-insurance')
} else {
  // Send user to other page
  res.redirect('/mvp1/checker/asylum-seeker')
}

})


// Asylum number CHECKER
router.post('/council-checker-asylum-answer', function (req, res) {

  // Make a variable 
  var seekingAsylum = req.session.data['seeking-asylum']

  // Check whether the variable matches a condition
  if (seekingAsylum == "yes"){
    // Send user to next page
    res.redirect('/mvp1/checker/nass-number')
  } else {
    // Send user to other page
    res.redirect('/mvp1/checker/check-answers')
  }

})



// NASS number CHECKER
router.post('/council-nass-number-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['nass-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/mvp1/checker/childs-age')
  } else {
    // Send user to other page
    res.redirect('/mvp1/checker/ineligible')
  }

})


 // NI number CHECKER
 router.post('/council-ni-number-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['ni-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/mvp1/checker/childs-age')
  } else {
    // Send user to other page
    res.redirect('/mvp1/checker/nass-number')
  }

})

//
  // NI number
  router.post('/ni-number-check', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['ni-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/mvp1/parent-soft-check/eligible')
    } else {
      // Send user to other page
      res.redirect('/mvp1/parent-soft-check/nass-number')
    }
  
  })

   /// Soft CHECKER
router.post('/mvp1-soft-check-ni-answer', function (req, res) {
  // Make a variable 
  var nassNumber = req.session.data['ni-number']
  // Check whether the variable matches a condition
 if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/mvp1/parent-soft-check/checking-loader')
  } else {
    // Send user to other page
   res.redirect('/mvp1/parent-soft-check/nass-number')
 }
})

router



////////////////////////////////mvp2///////////////////////////////

// Nationality
router.post('/nationality-answer', function (req, res) {

  // Make a variable 
  var whatNationality = req.session.data['what-nationality']

  // Check whether the variable matches a condition
  if (whatNationality == "british"){
    // Send user to next page
    res.redirect('/mvp2/checker-parent/national-insurance')
  } else {
    // Send user to other page
    res.redirect('/mvp2/checker-parent/asylum-seeker')
  }

})

// Asylum number
router.post('/asylum-answer', function (req, res) {

  // Make a variable 
  var seekingAsylum = req.session.data['seeking-asylum']

  // Check whether the variable matches a condition
  if (seekingAsylum == "yes"){
    // Send user to next page
    res.redirect('/mvp2/checker-parent/nass-number')
  } else {
    // Send user to other page
    res.redirect('/mvp2/checker-parent/more-info-required-asylum')
  }

})

  // NASS number
  router.post('/nass-number-answer', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['nass-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/mvp2/checker-parent/childs-age')
    } else {
      // Send user to other page
      res.redirect('/mvp2/checker-parent/more-info-required-asylum')
    }
  
  })

   // NI number
   router.post('/ni-number-answer', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['ni-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/mvp2/checker-parent/childs-age')
    } else {
      // Send user to other page
      res.redirect('/mvp2/checker-parent/nass-number')
    }
  
  })

//////////////////////////////////
// SCHOOLS AND COUNCIL JOURNEYS //
//////////////////////////////////


// Nationality / CHECKER /
router.post('/council-checker-nationality-answer', function (req, res) {

// Make a variable 
var whatNationality = req.session.data['what-nationality']

// Check whether the variable matches a condition
if (whatNationality == "british"){
  // Send user to next page
  res.redirect('/mvp2/checker/national-insurance')
} else {
  // Send user to other page
  res.redirect('/mvp2/checker/asylum-seeker')
}

})


// Asylum number CHECKER
router.post('/council-checker-asylum-answer', function (req, res) {

  // Make a variable 
  var seekingAsylum = req.session.data['seeking-asylum']

  // Check whether the variable matches a condition
  if (seekingAsylum == "yes"){
    // Send user to next page
    res.redirect('/mvp2/checker/nass-number')
  } else {
    // Send user to other page
    res.redirect('/mvp2/checker/check-answers')
  }

})



// NASS number CHECKER
router.post('/council-nass-number-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['nass-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/mvp2/checker/childs-age')
  } else {
    // Send user to other page
    res.redirect('/mvp2/checker/ineligible')
  }

})


 // NI number CHECKER
 router.post('/council-ni-number-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['ni-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/mvp2/checker/childs-age')
  } else {
    // Send user to other page
    res.redirect('/mvp2/checker/nass-number')
  }

})

//
  // NI number
  router.post('/ni-number-check', function (req, res) {

    // Make a variable 
    var nassNumber = req.session.data['ni-number']
  
    // Check whether the variable matches a condition
    if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/mvp2/parent-soft-check/eligible')
    } else {
      // Send user to other page
      res.redirect('/mvp2/parent-soft-check/nass-number')
    }
  
  })

   /// Soft CHECKER
router.post('/mvp2-soft-check-ni-answer', function (req, res) {
  // Make a variable 
  var nassNumber = req.session.data['ni-number']
  // Check whether the variable matches a condition
 if (nassNumber == "yes"){
    // Send user to next page
    res.redirect('/mvp2/parent-soft-check/checking-loader')
  } else {
    // Send user to other page
   res.redirect('/mvp2/parent-soft-check/nass-number')
 }
})

router