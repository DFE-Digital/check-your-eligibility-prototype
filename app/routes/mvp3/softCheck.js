module.exports = function(router) {

    router.post('/mvp3/_family/start-now', (req, res) => {
        req.session.data.user = {};
        res.redirect('/mvp3/_family/parent-soft-check/check');
    });

   // router.post('/mvp2/_family/parent-soft-check/check', (req, res) => {
   //     req.session.data.user = {};
   //     res.redirect('/mvp2/_family/parent-soft-check/check');
   // });


//mvp1//
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

  //var enteredNiNumber = req.session.data['ni-number-entered'];
  //console.log('Selected NI Number Option:', niNumber);
  //console.log('Entered NI Number:', enteredNiNumber);

//mvp3//
router.post('/mvp3-soft-check-ni-answer', function (req, res) {
// variable
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];
//check variable
    if (niNumber === "yes") {
        if (enteredNiNumber) {
            res.redirect('/mvp3/_family/parent-soft-check/checking-loader');
       } else {
            res.redirect('/mvp3/_family/parent-soft-check/error-ni');
        }
    } else {
        res.redirect('/mvp3/_family/parent-soft-check/nass-number');
    }
});

router.post('/nass-number-answer', function (req, res) {
    var nassNumber = req.session.data['nass-number'];

    if (nassNumber === "yes") {
        res.redirect('/mvp2/checker-parent/childs-age');
    } else {
        res.redirect('/mvp2/checker-parent/more-info-required-asylum');
    }
});

//mvp3//


//    /// Soft CHECKER
//    router.post('/mvp3_v1/_family/soft-check-ni-answer', function (req, res) {
//     // Make a variable
//     var nassNumber = req.session.data['ni-number']
//     // Check matches yes
//    if (nassNumber == "yes"){
//       // Send user to next page
//       res.redirect('/mvp3/_family/parent-soft-check/checking-loader')
//     } else {
//       // or send user to other page
//      res.redirect('/mvp3/_family/parent-soft-check/nass-number')
//    }
//   })


    router.post('/soft-check-ni-answer', function (req, res) {
        var niNumber = req.session.data['ni-number'];
        var enteredNiNumber = req.session.data['ni-number-entered'];

        console.log('Selected NI Number Option:', niNumber);
        console.log('Entered NI Number:', enteredNiNumber);

        if (niNumber === "yes") {
            if (enteredNiNumber) {
                res.redirect('/mvp3/_family/parent-soft-check/checking-loader');
            } else {
                res.redirect('/mvp3/_family/parent-soft-check/error-ni');
            }
        } else {
            res.redirect('/mvp3/_family/parent-soft-check/nass-number');
        }
    });

    router.post('/nass-number-answer', function (req, res) {
        var nassNumber = req.session.data['nass-number'];

        if (nassNumber === "yes") {
            res.redirect('/mvp2/checker-parent/childs-age');
        } else {
            res.redirect('/mvp2/checker-parent/more-info-required-asylum');
        }
    });
};


