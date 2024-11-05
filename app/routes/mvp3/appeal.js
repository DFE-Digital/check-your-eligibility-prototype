module.exports = function(router) {


  ///have-evidence///

  router.post('/mvp3-evidence', function (req, res) {
    // Make a variable
    var evidence = req.session.data['evidence']
    // Check whether the variable matches a condition
   if (evidence == "digital"){
      // Send user to next page
      res.redirect('/mvp3/_family/account/appeal/evidence/upload-guidance-digital')
    } else if (evidence === "paper") {
      // Send user to a different page for physical evidence
      res.redirect('/mvp3/_family/account/appeal/evidence/upload-guidance');
  } else {
      // Skip evidence section
      res.redirect('/mvp3/_family/account/appeal/add-child/child-details-blank');
  }
  })



}