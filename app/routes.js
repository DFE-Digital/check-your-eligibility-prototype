//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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
      res.redirect('/current/checker-parent/check-answers')
    }
  
  })