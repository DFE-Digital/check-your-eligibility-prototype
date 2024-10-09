//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})
// app.js
const express = require('express');
const app = express();

// Make the data folder available at the /data URL
router.use('/data', express.static(path.join(__dirname, '../data'))); // Adjust the path as necessary

//app.use('/data', express.static(path.join(__dirname + '/data')));

const mainRouter = require('../routes');

app.use(mainRouter);

// Add other configurations and middleware

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
