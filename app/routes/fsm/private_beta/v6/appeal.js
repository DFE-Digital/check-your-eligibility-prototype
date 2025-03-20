module.exports = function (router) {

  ///have-evidence///
  router.post('/v6-evidence', function (req, res) {
    // Make a variable
    var evidence = req.session.data['evidence']
    // Check whether the variable matches a condition
    if (evidence == "digital") {
      // Send user to next page
      res.redirect('FSM/Private_beta/v6/_family/account/appeal/evidence/upload-guidance-digital')
    } else if (evidence === "paper") {
      // Send user to a different page for physical evidence
      res.redirect('FSM/Private_beta/v6/_family/account/appeal/evidence/upload-guidance');
    } else {
      // Skip evidence section
      res.redirect('FSM/Private_beta/v6/_family/account/appeal/add-child/child-details-blank');
    }
  })
  ///////////////////////////////////////////////////////////////////////////////////////

  ///temp gov routes///
  router.post('/v6-gov', function (req, res) {
    res.redirect('FSM/Private_beta/v6/_family/account/appeal/evidence/have-evidence.html');
})

  //////GOV login either or routng - needs fixing///////
// module.exports = function (router) {

  router.get('/v6/_family/parent-soft-check/outcomes/outcome-not-entitled-appeal', (req, res) => {
      req.session.data.startingPage = 'appeal-process';
      res.render('v6/_family/parent-soft-check/outcomes/outcome-not-entitled-appeal');
  });
  router.get('/v6/_family/parent-soft-check/outcomes/eligible', (req, res) => {
      req.session.data.startingPage = 'eligible';
      res.render('v6/_family/parent-soft-check/outcomes/eligible');
  });
  // Route for signin-or-create
  router.get('/account/signin-or-create', (req, res) => {
      req.session.data.startingPage = 'appeal-process';
      res.render('account/signin-or-create');
  });
  // POST route for sign-in submission
  router.post('/v6/_family/account/onegov-signin', (req, res) => {
      req.session.data.user = {};
      res.redirect('/account/enter-password');
  });

  router.get('/account/enter-password', (req, res) => {
    req.session.data.user = {};
    res.redirect('FSM/Private_beta/v6/_family/account/check-your-phone');
});

  // Direct to final page based on starting page
  router.get('/account/enter-password', (req, res) => {
      if (req.session.data.startingPage === 'appeal-process') {
          res.redirect('FSM/Private_beta/v6/_family/account/appeal/evidence/have-evidence');
      } else if (req.session.data.startingPage === 'eligible') {
          res.redirect('FSM/Private_beta/v6/_family/account/apply/childs-age');
      }
  });

    ///paper-evidence///
    router.post('/v6-paper', function (req, res) {
      res.redirect('FSM/Private_beta/v6/_family/account/appeal/evidence/upload-guidance');
  })

      ///digital-evidence///
      router.post('/v6-digital', function (req, res) {
        res.redirect('FSM/Private_beta/v6/_family/account/appeal/evidence/upload-guidance');
    })
    ///child-details///
    router.post('/v6-child', function (req, res) {
      res.redirect('FSM/Private_beta/v6/_family/account/appeal/add-child/child-details-1');
  })

      ///child-1///
      router.post('/v6-child-1', function (req, res) {
        res.redirect('FSM/Private_beta/v6/_family/account/appeal/find-school/find-school-1.html');
    })

        ///school///
        router.post('/v6-school', function (req, res) {
          res.redirect('FSM/Private_beta/v6/_family/account/appeal/find-school/confirm-school.html');
      })

        ///manual-school///
        router.post('/v6-manual', function (req, res) {
          res.redirect('FSM/Private_beta/v6/_family/account/appeal/find-school/confirm-school.html');
      })

      ///confirm///
      router.post('/v6-added', function (req, res) {
        res.redirect('FSM/Private_beta/v6/_family/account/appeal/add-child/child-details-complete-1.html');
    })

      ///success///
      router.post('/v6-success', function (req, res) {
        res.redirect('FSM/Private_beta/v6/_family/account/appeal/add-child/children-added.html');
    })

}

