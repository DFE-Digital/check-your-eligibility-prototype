module.exports = function(router) {

router.post('/FSM/Private_beta/v8-1/LA/la-manage/la-soft-check/run-check', function (req, res) {
      var nino = (req.session.data['nationalInsuranceNumber'] || '')
      .toUpperCase()
      .replace(/\s/g, '')

    var eligibilityLookup = {
      'AB123456A': {
        eligibilityType: 'targeted',
        policyLabel: 'Eligible targeted',
        tagClass: 'govuk-tag--purple',
        eligibilityMessage: 'This parent or guardian is eligible for targeted free school meals.',
        endDate: '31 August 2027',
        recheckDate: 'Summer term 2027'
      },
      'CD123456C': {
        eligibilityType: 'expanded',
        policyLabel: 'Eligible expanded',
        tagClass: 'govuk-tag--green',
        eligibilityMessage: 'This parent or guardian is eligible for expanded free school meals.',
        endDate: '31 August 2027',
        recheckDate: 'Summer term 2027'
      },
      'PN123456D': {
        eligibilityType: 'notEligible',
        policyLabel: 'Not eligible',
        tagClass: 'govuk-tag--red',
        eligibilityMessage: 'This parent or guardian is not eligible for free school meals.',
        endDate: '31 August 2026',
        recheckDate: ''
      }
    }


// router.post('/FSM/Private_beta/v8-1/LA/la-manage/apply/check-answers', function (req, res) {
//   console.log('CHECK ANSWERS ROUTE HIT (SOFTCHECK)')
//   res.redirect('/FSM/Private_beta/v8-1/LA/la-manage/apply/la-check-answers.html')
// })


//     console.log('Raw NINo:', req.session.data['nationalInsuranceNumber'])
// console.log('Clean NINo:', nino)

var result = eligibilityLookup[nino] || eligibilityLookup['PN123456D']
    // console.log('Matched result:', result.eligibilityType)

    req.session.data['eligibilityType'] = result.eligibilityType
    req.session.data['policyLabel'] = result.policyLabel
    req.session.data['tagClass'] = result.tagClass
    req.session.data['eligibilityMessage'] = result.eligibilityMessage
    req.session.data['endDate'] = result.endDate
    req.session.data['recheckDate'] = result.recheckDate

    res.redirect('/FSM/Private_beta/v8-1/LA/la-manage/la-soft-check/checking-la-loader.html')
  });



  // Route to start the process
  router.post('/FSM/Private_beta/v8-1/family/start-now', (req, res) => {
      req.session.data.user = {};
      res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/check');
  });

  // Route for soft check NI answer
  router.post('/FSM/Private_beta/v8-1-soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];

    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/nass-number');
    }
  });

  // Route for NASS number answer
  router.post('/nass-number-answer', function (req, res) {
    var nassNumber = req.session.data['nass-number'];

    if (nassNumber === "yes") {
      res.redirect('/FSM/Private_beta/v8-1/checker-parent/childs-age');
    } else {
      res.redirect('/FSM/Private_beta/v8-1/checker-parent/more-info-required-asylum');
    }
  });

  // Route for soft check NI answer with logging
  router.post('/soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];

    console.log('Selected NI Number Option:', niNumber);
    console.log('Entered NI Number:', enteredNiNumber);

    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/nass-number');
    }
  });

  // Duplicate route for soft check NI answer (can be removed if not needed)
  router.post('/v7-2-soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];

    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v8-1/family/parent-soft-check/nass-number');
    }
  });

};
