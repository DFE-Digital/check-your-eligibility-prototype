const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/current')



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
        res.redirect('/current/checker-parent/more-info-required')
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
      res.redirect('/current/checker/ineligible')
    }
  
  })