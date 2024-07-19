// Folder routes
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/mvp1');

const version = 'mvp1';

require('./parent-soft-check/_routes')

//app/views/mvp1/routes.js

router.get('/', function (req, res) {
  // Update render path if necessary
  res.render('mvp1/index');
});

module.exports = router;
 
