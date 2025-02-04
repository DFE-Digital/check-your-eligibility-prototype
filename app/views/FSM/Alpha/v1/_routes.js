const express = require('express');
const router = express.Router();

// Your route definitions go here

// NI number
router.post('/v1-ni-number-answer', function (req, res) {
  // Make a variable
  var nassNumber = req.session.data['ni-number'];

  // Check whether the variable matches a condition
  if (nassNumber == "yes") {
    // Send user to next page
    res.redirect('/current/checker-parent/childs-age');
  } else {
    // Send user to other page
    res.redirect('/current/checker-parent/nass-number');
  }
});

module.exports = router;
