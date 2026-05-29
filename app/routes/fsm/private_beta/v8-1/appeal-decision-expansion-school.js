module.exports = function (router) {
  router.post('/FSM/Private_beta/v8-1/appeal-decision-school/:childId', function (req, res) {
    const decision = req.session.data.decision
    const childId = req.params.childId

    console.log('Decision:', decision)
    console.log('Child ID:', childId)

    if (decision === 'approve-targeted') {
      return res.redirect(`/FSM/Private_beta/v8-1/school/school-manage/decision/review/needs-review/approved/targeted/approve-targeted-${childId}`)
    }

    if (decision === 'approve-expanded') {
      return res.redirect(`/FSM/Private_beta/v8-1/school/school-manage/decision/review/needs-review/approved/expanded/approve-expanded-${childId}`)
    }

    if (decision === 'decline') {
      return res.redirect(`/FSM/Private_beta/v8-1/school/school-manage/decision/review/needs-review/declined/decline-${childId}`)
    }

    return res.redirect(`/FSM/Private_beta/v8-1/school/school-manage/decision/review/needs-review/pending_${childId}`)
  })
}

// router.get('/fsm/private_beta/v8-1/test_johnson1', function (req, res) {
//   res.send('Route works!');
// });


//   router.post('/FSM/private_beta/v8-1/appeal-decision-school/johnson1', function (req, res) {
//     const decision = req.session.data['decision'];

//     if (decision === 'approve targeted') {
//       res.redirect('/FSM/private_beta/v8-1/LA/la-manage/decision/records/review/approved/targeted/approve-targeted-johnson1');

//     } else if (decision === 'approve expanded') {
//       res.redirect('/FSM/private_beta/v8-1/LA/la-manage/decision/records/review/approved/expanded/approve-expanded-johnson1');

//     } else if (decision === 'decline') {
//       res.redirect('/FSM/private_beta/v8-1/LA/la-manage/decision/records/review/declined/decline-johnson1');

//     } else {
//       res.redirect('/FSM/private_beta/v8-1/appeal-decision/johnson1');
//     }
//   });
// };

