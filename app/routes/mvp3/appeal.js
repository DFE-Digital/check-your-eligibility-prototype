module.exports = function (router) {

///have-evidence///
router.post('/mvp3-evidence', function (req, res) {
  // Make a variable
  var evidence = req.session.data['evidence']
  // Check whether the variable matches a condition
  if (evidence == "digital") {
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
///////////////////////////////////////////////////////////////////////////////////////

///have-evidence///
router.post('/mvp3-school-evidence', function (req, res) {
  // Make a variable
  var evidence = req.session.data['schools_evidence']
  // Check whether the variable matches a condition
  if (evidence == "digital") {
    // Send user to next page
    res.redirect('/FSM/Private_beta/v8/school_appeal/upload-guidance-digital');
  } else if (evidence === "paper") {
    // Send user to a different page for physical evidence
    res.redirect('/FSM/Private_beta/v8/school_appeal/upload-guidance');
  } else if (evidence === "later") {
    // Send user to a different page for uploading later
    res.redirect('/FSM/Private_beta/v8/school_appeal/appeal-check-answers-skip');
  } else {
    // Send by email
    res.redirect('/FSM/Private_beta/v8/school_appeal/appeal-check-answers-skip');
  }

})
///////////////////////////////////////////////////////////////////////////////////////

///have-evidence///
router.post('/mvp3-school-add-evidence', function (req, res) {
  // Make a variable
  var evidence = req.session.data['schools_add_evidence']
  // Check whether the variable matches a condition
  if (evidence == "digital") {
    // Send user to next page
    res.redirect('/FSM/Private_beta/v8/school_appeal/add_evidence/upload-guidance-digital-add');
  } else if (evidence === "paper") {
    // Send user to a different page for physical evidence
    res.redirect('/FSM/Private_beta/v8/school_appeal/add_evidence/upload-guidance-add');
  }

})
///////////////////////////////////////////////////////////////////////////////////////

  ///temp gov routes///
  router.post('/mvp3-gov', function (req, res) {
    res.redirect('/mvp3/_family/account/appeal/evidence/have-evidence.html');
})

  //////GOV login either or routng - needs fixing///////
// module.exports = function (router) {

  router.get('/mvp3/_family/parent-soft-check/outcomes/outcome-not-entitled-appeal', (req, res) => {
      req.session.data.startingPage = 'appeal-process';
      res.render('mvp3/_family/parent-soft-check/outcomes/outcome-not-entitled-appeal');
  });
  router.get('/mvp3/_family/parent-soft-check/outcomes/eligible', (req, res) => {
      req.session.data.startingPage = 'eligible';
      res.render('mvp3/_family/parent-soft-check/outcomes/eligible');
  });
  // Route for signin-or-create
  router.get('/account/signin-or-create', (req, res) => {
      req.session.data.startingPage = 'appeal-process';
      res.render('account/signin-or-create');
  });
  // POST route for sign-in submission
  router.post('/mvp3/_family/account/onegov-signin', (req, res) => {
      req.session.data.user = {};
      res.redirect('/account/enter-password');
  });

  router.get('/account/enter-password', (req, res) => {
    req.session.data.user = {};
    res.redirect('/mvp3/_family/account/check-your-phone');
});

  // Direct to final page based on starting page
  router.get('/account/enter-password', (req, res) => {
      if (req.session.data.startingPage === 'appeal-process') {
          res.redirect('/mvp3/_family/account/appeal/evidence/have-evidence');
      } else if (req.session.data.startingPage === 'eligible') {
          res.redirect('/mvp3/_family/account/apply/childs-age');
      }
  });

    ///paper-evidence///
    router.post('/mvp3-paper', function (req, res) {
      res.redirect('/mvp3/_family/account/appeal/evidence/upload-guidance');
  })

      ///digital-evidence///
      router.post('/mvp3-digital', function (req, res) {
        res.redirect('/mvp3/_family/account/appeal/evidence/upload-guidance');
    })
    ///child-details///
    router.post('/mvp3-child', function (req, res) {
      res.redirect('/mvp3/_family/account/appeal/add-child/child-details-1');
  })

      ///child-1///
      router.post('/mvp3-child-1', function (req, res) {
        res.redirect('/mvp3/_family/account/appeal/find-school/find-school-1.html');
    })

        ///school///
        router.post('/mvp3-school', function (req, res) {
          res.redirect('/mvp3/_family/account/appeal/find-school/confirm-school.html');
      })

        ///manual-school///
        router.post('/mvp3-manual', function (req, res) {
          res.redirect('/mvp3/_family/account/appeal/find-school/confirm-school.html');
      })

      ///confirm///
      router.post('/mvp3-added', function (req, res) {
        res.redirect('/mvp3/_family/account/appeal/add-child/child-details-complete-1.html');
    })

      ///success///
      router.post('/mvp3-success', function (req, res) {
        res.redirect('/mvp3/_family/account/appeal/add-child/children-added.html');
    })

}

