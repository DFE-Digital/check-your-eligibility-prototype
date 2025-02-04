const fs = require('fs');
const path = require('path');
const express = require('express');

module.exports = function(router) {
  // Route to get application data
  router.get('/application', (req, res) => {
    // Read the existing JSON file
    let applicationData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/application.json')));

    // Check if childDetails are present
    if (!applicationData.childDetails ||
        !applicationData.childDetails.firstName ||
        !applicationData.childDetails.lastName) {
      // Set default values
      applicationData.childDetails = {
        firstName: "Eden",
        lastName: "Tesfay"
      };
    }

    // Render the template with the application data
    res.render('your-template', { application: applicationData });
  });

  // Define success route
  router.get('/', (req, res) => {
    res.send('Success page');
  });
};
