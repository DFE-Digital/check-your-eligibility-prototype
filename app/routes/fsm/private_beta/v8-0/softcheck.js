module.exports = function(router) {

  // Route to start the process
  router.post('/FSM/Private_beta/v7-2/family/start-now', (req, res) => {
      req.session.data.user = {};
      res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/check');
  });

  // Route for soft check NI answer
  router.post('/FSM/Private_beta/v7-2-soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];

    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/nass-number');
    }
  });

  // Route for NASS number answer
  router.post('/nass-number-answer', function (req, res) {
    var nassNumber = req.session.data['nass-number'];

    if (nassNumber === "yes") {
      res.redirect('/FSM/Private_beta/v7-2/checker-parent/childs-age');
    } else {
      res.redirect('/FSM/Private_beta/v7-2/checker-parent/more-info-required-asylum');
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
        res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/nass-number');
    }
  });

  // Duplicate route for soft check NI answer (can be removed if not needed)
  router.post('/v7-2-soft-check-ni-answer', function (req, res) {
    var niNumber = req.session.data['ni-number'];
    var enteredNiNumber = req.session.data['ni-number-entered'];

    if (niNumber === "yes") {
      if (enteredNiNumber) {
        res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/checking-loader');
      } else {
        res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/error-ni');
      }
    } else {
      res.redirect('/FSM/Private_beta/v7-2/family/parent-soft-check/nass-number');
    }
  });

};
