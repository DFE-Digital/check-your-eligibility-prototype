module.exports = function(router) {

  router.post('/v7-1/_family/start-now', (req, res) => {
    req.session.data.user = {};
    res.redirect('/v7-1/_family/parent-soft-check/check');
});

// router.post('/v7-1/_family/parent-soft-check/check', (req, res) => {
//     req.session.data.user = {};
//     res.redirect('/v7-1/_family/parent-soft-check/check');
// });

//v7-1//
router.post('/v7-1-soft-check-ni-answer', function (req, res) {
// Make a variable
var nassNumber = req.session.data['ni-number']
// Check whether the variable matches a condition
if (nassNumber == "yes"){
  // Send user to next page
  res.redirect('/v7-1/parent-soft-check/checking-loader')
} else {
  // Send user to other page
 res.redirect('/v7-1/parent-soft-check/nass-number')
}
})

  //var enteredNiNumber = req.session.data['ni-number-entered'];
  //console.log('Selected NI Number Option:', niNumber);
  //console.log('Entered NI Number:', enteredNiNumber);


module.exports = router;
}
