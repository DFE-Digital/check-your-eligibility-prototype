module.exports = function(router) {

  ///Privatebetachoicev6///
router.post('/v6-betacheck', function (req, res) {
  // Make a variable
  var betaschool = req.session.data['betaschool']
  // Check whether the variable matches a condition
 if (betaschool == "Yes"){
    // Send user to next page
    res.redirect('FSM/Private_beta/v6/family/parent-soft-check/check.html')
  } else {
    // Send user to a different page for physical evidence
    res.redirect('FSM/Private_beta/v6/family/parent-soft-check/beta-school-check-no.html');
}
})

module.exports = router;
}
