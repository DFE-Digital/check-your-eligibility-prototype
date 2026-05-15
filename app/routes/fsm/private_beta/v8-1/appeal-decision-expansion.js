module.exports = function (router) {

router.get('/fsm/private_beta/v8-1/test_johnson1', function (req, res) {
  res.send('Route works!');
});


router.post('/fsm/private_beta/v8-1/appeal-decision/johnson1', function (req, res) {
  const decision = req.session.data['decision'];

  if (decision === 'approve') {
    res.redirect('/fsm/private_beta/v8-1/LA/la-manage/decision/records/approve-johnson1');
  } else if (decision === 'decline') {
    res.redirect('/fsm/private_beta/v8-1/LA/la-manage/decision/records/decline-johnson1');
  } else if (decision === 'pending') {
    res.redirect('/fsm/private_beta/v8-1/LA/la-manage/decision/records/requestmore-johnson1');
  } else {
    res.redirect('/fsm/private_beta/v8-1/appeal-decision');
  }
});
}

