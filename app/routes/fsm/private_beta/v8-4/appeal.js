module.exports = function (router) {
////v8-4///
  ///have-evidence///
  router.post('/v8-4-evidence', function (req, res) {
    var evidence = req.session.data['evidence'];
    if (evidence === "v7digital") {
      res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/evidence/upload-guidance-digital');
    } else if (evidence === "v7paper") {
      res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/evidence/upload-guidance');
    } else {
      res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/add-child/child-details-complete-0-none.html');
    }
  });

  router.post('/v7-1-evidence', function (req, res) {
    req.session.data['evidence'] = req.session.data['evidence'] || 'v7digital';
    res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/evidence/upload-guidance-digital');
  });

  router.post('/v8-4-gov-2', function (req, res) {
    res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/add-child/child-details-0.html');
  });

  router.get('/FSM/Private_beta/v8-4/family/parent-soft-check/outcomes/outcome-not-entitled-appeal', (req, res) => {
    req.session.data.startingPage = 'appeal-process';
    res.render('/FSM/Private_beta/v8-4/family/parent-soft-check/outcomes/outcome-not-entitled-appeal');
  });

  router.get('/v8-4/family/parent-soft-check/outcomes/eligible', (req, res) => {
    req.session.data.startingPage = 'eligible';
    res.render('v8-4/family/parent-soft-check/outcomes/eligible');
  });

  router.get('/account/signin-or-create', (req, res) => {
    req.session.data.startingPage = 'appeal-process';
    res.render('account/signin-or-create');
  });

  router.post('/v8-4/family/account/onegov-signin', (req, res) => {
    req.session.data.user = {};
    res.redirect('/account/enter-password');
  });

  router.get('/account/enter-password', (req, res) => {
    req.session.data.user = {};
    res.render('account/enter-password');
  });

  router.post('/account/enter-password', (req, res) => {
    if (req.session.data.startingPage === 'appeal-process') {
      res.redirect('/v8-4/family/account/appeal/evidence/have-evidence');
    } else if (req.session.data.startingPage === 'eligible') {
      res.redirect('/v8-4/family/account/apply/childs-age');
    }
  });

  router.post('/check-answers2', function (req, res) {
    res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/evidence/have-evidence.html');
  });

  router.post('/v8-4-paper', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/evidence/upload-guidance');
  });

  router.post('/v8-4-digital', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/evidence/upload-guidance');
  });

  router.post('/v8-4-child', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/add-child/child-details-1');
  });

  router.post('/v8-4-child-1', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/find-school/find-school-1.html');
  });

  router.post('/v8-4-school', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/find-school/confirm-school.html');
  });

  router.post('/v8-4-manual', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/find-school/confirm-school.html');
  });

  router.post('/v8-4-added', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/add-child/child-details-complete-1.html');
  });

  router.post('/v8-4-success', function (req, res) {
    res.redirect('/v8-4/family/account/appeal/add-child/children-added.html');
  });

  router.post('/v8-4-success-0', function (req, res) {
    res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/add-child/children-added-0.html');
  });

  router.post('/v8-4-success-none', function (req, res) {
    res.redirect('/FSM/Private_beta/v8-4/family/account/appeal/add-child/children-added-0-none.html');
  });
};


