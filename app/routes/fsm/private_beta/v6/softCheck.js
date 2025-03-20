module.exports = function(router) {

    router.post('/FSM/Private_beta/v6/family/start-now', (req, res) => {
        req.session.data.user = {};
        res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/check');
    });

   // router.post('/FSM/Private_beta/v6/family/parent-soft-check/check', (req, res) => {
   //     req.session.data.user = {};
   //     res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/check');
   // });


//mvp1//
   router.post('/FSM/Private_beta/v6-soft-check-ni-answer', function (req, res) {
    // Make a variable
    var nassNumber = req.session.data['ni-number']
    // Check whether the variable matches a condition
   if (nassNumber == "yes"){
      // Send user to next page
      res.redirect('/FSM/Private_beta/v6/parent-soft-check/checking-loader')
    } else {
      // Send user to other page
     res.redirect('/FSM/Private_beta/v6/parent-soft-check/nass-number')
   }
  })

  //var enteredNiNumber = req.session.data['ni-number-entered'];
  //console.log('Selected NI Number Option:', niNumber);
  //console.log('Entered NI Number:', enteredNiNumber);

//FSM/Private_beta/v6//
router.post('/FSM/Private_beta/v6-soft-check-ni-answer', function (req, res) {
// variable
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];
//check variable
    if (niNumber === "yes") {
        if (enteredNiNumber) {
            res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/checking-loader');
       } else {
            res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/error-ni');
        }
    } else {
        res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/nass-number');
    }
});

router.post('/nass-number-answer', function (req, res) {
    var nassNumber = req.session.data['nass-number'];

    if (nassNumber === "yes") {
        res.redirect('/FSM/Private_beta/v6/checker-parent/childs-age');
    } else {
        res.redirect('/FSM/Private_beta/v6/checker-parent/more-info-required-asylum');
    }
});

//FSM/Private_beta/v6//

//    /// Soft CHECKER
//    router.post('/FSM/Private_beta/v6_v1/family/soft-check-ni-answer', function (req, res) {
//     // Make a variable
//     var nassNumber = req.session.data['ni-number']
//     // Check matches yes
//    if (nassNumber == "yes"){
//       // Send user to next page
//       res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/checking-loader')
//     } else {
//       // or send user to other page
//      res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/nass-number')
//    }
//   })

    router.post('/soft-check-ni-answer', function (req, res) {
        var niNumber = req.session.data['ni-number'];
        var enteredNiNumber = req.session.data['ni-number-entered'];

        console.log('Selected NI Number Option:', niNumber);
        console.log('Entered NI Number:', enteredNiNumber);

        if (niNumber === "yes") {
            if (enteredNiNumber) {
                res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/checking-loader');
            } else {
                res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/error-ni');
            }
        } else {
            res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/nass-number');
        }
    });

    router.post('/nass-number-answer', function (req, res) {
        var nassNumber = req.session.data['nass-number'];

        if (nassNumber === "yes") {
            res.redirect('/FSM/Private_beta/v6/checker-parent/childs-age');
        } else {
            res.redirect('/FSM/Private_beta/v6/checker-parent/more-info-required-asylum');
        }
    });

  // Define the route for handling the form submission
  router.post('/v6-soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];

    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v6/family/parent-soft-check/nass-number');
    }
  });
};


