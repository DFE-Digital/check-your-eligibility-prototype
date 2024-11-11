module.exports = function(router) {



///Privatebetachoice///
router.post('/mvp2-betacheck', function (req, res) {
  // Make a variable
  var betaschool = req.session.data['betaschool']
  // Check whether the variable matches a condition
 if (betaschool == "Yes"){
    // Send user to next page
    res.redirect('/mvp2/parent-soft-check/check.html')
  } else {
    // Send user to a different page for physical evidence
    res.redirect('/mvp2/parent-soft-check/account/beta-school-check-no.html');
}
})





module.exports = router;
}
