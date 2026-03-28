module.exports = function (router) {

router.get('/fsm/private_beta/v8-0/test_johnson1', function (req, res) {
  res.send('Route works!');
});


router.post('/fsm/private_beta/v8-0/appeal-decision/johnson1', function (req, res) {
  const decision = req.session.data['decision'];

  if (decision === 'approve') {
    res.redirect('/fsm/private_beta/v8-0/LA/la-manage/decision/records/approve-johnson1');
  } else if (decision === 'decline') {
    res.redirect('/fsm/private_beta/v8-0/LA/la-manage/decision/records/decline-johnson1');
  } else if (decision === 'pending') {
    res.redirect('/fsm/private_beta/v8-0/LA/la-manage/decision/records/requestmore-johnson1');
  } else {
    res.redirect('/fsm/private_beta/v8-0/appeal-decision');
  }
});

 //Patel

router.get('/fsm/private_beta/v8-0/test-patel1', function (req, res) {
  res.send('Route works!');
});

router.post('/fsm/private_beta/v8-0/appeal-decision/patel1', function (req, res) {
  const decision = req.session.data['decision-patel'];

  if (decision === 'approve-patel') {
    res.redirect('/fsm/private_beta/v8-0/mat/mat-manage/records/appeals/approve-patel1');
  } else if (decision === 'decline-patel') {
    res.redirect('/fsm/private_beta/v8-0/mat/mat-manage/records/appeals/decline-patel1');
  } else if (decision === 'pending-patel') {
    res.redirect('/fsm/private_beta/v8-0/mat/mat-manage/records/appeals/requestmore-patel1');
  } else {
    res.redirect('/fsm/private_beta/v8-0/appeal-decision');
  }
});


};
