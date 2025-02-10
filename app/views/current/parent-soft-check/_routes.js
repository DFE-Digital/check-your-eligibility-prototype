const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/current')

require('./_routes')

    // NI number CHECKER
    router.post('/test-answer', function (req, res) {

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
      