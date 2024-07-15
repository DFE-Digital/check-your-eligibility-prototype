const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/mvp1')

///mvp1///
const routes = require('./views/mvp1/_routes');


    // NI number CHECKER
    router.post('/test-answer', function (req, res) {

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

      
      // Soft CHECKER 
router.post('/soft-check-ni-answer', function (req, res) {

  // Make a variable 
  var nassNumber = req.session.data['ni-number']

  // Check whether the variable matches a condition
  if (nassNumber == "yes"){
    // Send user to next page
    console.log(true)
    res.redirect('/mvp1/parent-soft-check/checking-loader')
  } else {
    console.log(false)
    // Send user to other page
    res.redirect('/mvp1/parent-soft-check/nass-number')
  }

})


