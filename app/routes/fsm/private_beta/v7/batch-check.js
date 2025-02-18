const express = require('express');
const router = express.Router();

// Route to render the radio button form
router.get('/radio-button-form', (req, res) => {
  res.render('radio-button-form');
});

// Route to handle the radio button form submission
router.post('/radio-button-form', (req, res) => {
  const selectedOption = req.body.radioOption;
  if (selectedOption === 'option1') {
    // Handle option 1 Connect - local school
    res.redirect('/option1-result');
  } else if (selectedOption === 'option2') {
    // Handle option 2 Upload manual batch check
    res.redirect('/option2-result');
  } else {
    // Handle other options or errors
    res.redirect('/error');
  }
});

module.exports = router;