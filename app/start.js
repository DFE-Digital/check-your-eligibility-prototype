const prototype = require('govuk-prototype-kit/server');

const port = Number(process.env.PORT || 3000);

prototype.listen(port, () => {
  console.log(`The Prototype Kit is running on port ${port}`);
});