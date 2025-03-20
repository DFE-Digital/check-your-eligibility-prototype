module.exports = function(router) {

  ///Privatebetachoice///
router.post('/v7-1-betacheck', function (req, res) {
  // Make a variable
  var betaschool = req.session.data['betaschool']
  // Check whether the variable matches a condition
 if (betaschool == "Yes"){
    // Send user to next page
    res.redirect('FSM/Private_beta/v7-1/family/parent-soft-check/check.html')
  } else {
    // Send user to a different page for physical evidence
    res.redirect('FSM/Private_beta/v7-1/family/beta-school-check-no.html');
}
})

module.exports = router;
}
