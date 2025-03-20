module.exports = function (router) {
////v7-1///
  ///have-evidence///
  router.post('/v7-1-evidence', function (req, res) {
    var evidence = req.session.data['evidence'];
    if (evidence === "v7digital") {
      res.redirect('/v7-1/family/account/appeal/evidence/upload-guidance-digital');
    } else if (evidence === "v7paper") {
      res.redirect('/v7-1/family/account/appeal/evidence/upload-guidance');
    } else {
      res.redirect('/v7-1/family/account/appeal/add-child/child-details-blank');
    }
  });

  ///temp gov routes///
  router.post('/v7-1-gov', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/evidence/have-evidence.html');
  });

  router.get('/v7-1/family/parent-soft-check/outcomes/outcome-not-entitled-appeal', (req, res) => {
    req.session.data.startingPage = 'appeal-process';
    res.render('v7-1/family/parent-soft-check/outcomes/outcome-not-entitled-appeal');
  });

  router.get('/v7-1/family/parent-soft-check/outcomes/eligible', (req, res) => {
    req.session.data.startingPage = 'eligible';
    res.render('v7-1/family/parent-soft-check/outcomes/eligible');
  });

  router.get('/account/signin-or-create', (req, res) => {
    req.session.data.startingPage = 'appeal-process';
    res.render('account/signin-or-create');
  });

  router.post('/v7-1/family/account/onegov-signin', (req, res) => {
    req.session.data.user = {};
    res.redirect('/account/enter-password');
  });

  router.get('/account/enter-password', (req, res) => {
    req.session.data.user = {};
    res.render('account/enter-password');
  });

  router.post('/account/enter-password', (req, res) => {
    if (req.session.data.startingPage === 'appeal-process') {
      res.redirect('/v7-1/family/account/appeal/evidence/have-evidence');
    } else if (req.session.data.startingPage === 'eligible') {
      res.redirect('/v7-1/family/account/apply/childs-age');
    }
  });

  ///paper-evidence///
  router.post('/v7-1-paper', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/evidence/upload-guidance');
  });

  ///digital-evidence///
  router.post('/v7-1-digital', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/evidence/upload-guidance');
  });

  ///child-details///
  router.post('/v7-1-child', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/add-child/child-details-1');
  });

  ///child-1///
  router.post('/v7-1-child-1', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/find-school/find-school-1.html');
  });

  ///school///
  router.post('/v7-1-school', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/find-school/confirm-school.html');
  });

  ///manual-school///
  router.post('/v7-1-manual', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/find-school/confirm-school.html');
  });

  ///confirm///
  router.post('/v7-1-added', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/add-child/child-details-complete-1.html');
  });

  ///success///
  router.post('/v7-1-success', function (req, res) {
    res.redirect('/v7-1/family/account/appeal/add-child/children-added.html');
  });

};

