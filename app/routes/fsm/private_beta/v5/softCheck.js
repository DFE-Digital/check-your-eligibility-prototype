module.exports = function(router) {


///Privatebetachoice///

router.post('/mvp2-beta-check', (req, res) => {

  // Check whether the variable matches a condition
  if (beta-school == "yes"){
    // Send user to next page
    res.redirect('/mvp2/parent-soft-check/account/beta-school-check')
  } else {
    // Send user to other page
    res.redirect('/mvp2/parent-soft-check/account/beta-school-check-no')
  }
})






  router.post('/mvp2/_family/start-now', (req, res) => {
        req.session.data.user = {};
        res.redirect('/mvp2/_family/parent-soft-check/check');
    });

   // router.post('/mvp2/_family/parent-soft-check/check', (req, res) => {
   //     req.session.data.user = {};
   //     res.redirect('/mvp2/_family/parent-soft-check/check');
   // });

//mvp2//
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

  //var enteredNiNumber = req.session.data['ni-number-entered'];
  //console.log('Selected NI Number Option:', niNumber);
  //console.log('Entered NI Number:', enteredNiNumber);


module.exports = router;
}
