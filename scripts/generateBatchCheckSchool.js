const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

// Helper function to get a random date within a specific range
function getRandomDateWithinRange(fromDate, toDate) {
  const fromTime = fromDate.getTime();
  const toTime = toDate.getTime();
  const randomTime = faker.number.int({ min: fromTime, max: toTime });
  return new Date(randomTime);
}

function generateNameInLocale(locale) {
  faker.locale = locale;
  const englishName = generateNameInLocale('en_GB');
  const irishName = generateNameInLocale('en_IE');
  const ArabicName = generateNameInLocale('ar');
}


// Function to generate an email address based on the parent's name
function generateEmail(firstName, lastName) {
  const cleanFirstName = firstName.toLowerCase().replace(/\s+/g, '.');
  const cleanLastName = lastName.toLowerCase().replace(/\s+/g, '.');
  return `${cleanFirstName}.${cleanLastName}@example.com`;
}


// Function to generate fake data for one table row
function generateRow() {
  const lastName = faker.person.lastName(); // shared last name
  return {
    parentName: faker.person.firstName() + " " + lastName,
    parentDOB: faker.date.birthdate({ min: 20, max: 65, mode: 'age' }).toISOString().split('T')[0], // Format: YYYY-MM-DD
    email: faker.internet.email(firstName, lastName),
    childName: faker.person.firstName() + " " + lastName,
    childDOB: faker.date.birthdate({ min: 5, max: 18, mode: 'age' }).toISOString().split('T')[0], // Format: YYYY-MM-DD
  };
}

// Function to generate multiple rows of data
function generateTableData(rows = 10) {
  const data = [];
  for (let i = 0; i < rows; i++) {
    data.push(generateRow());
  }
  return data;
}

// Generate data for different table sections
const jsonData = {
  eligible: generateTableData(10),
  notEligible: generateTableData(5),
  couldNotCheck: generateTableData(3),
  error: generateTableData(2),
};

// Write the JSON data to a file
fs.writeFile('tableData.json', JSON.stringify(jsonData, null, 2), (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON file has been generated: tableData.json');
  }
});

// Function to generate a single application
function generateApplication() {
  const lastName = faker.person.lastName(); // Generate a shared last name
  return {
    applicationId: faker.string.uuid(),
    parentName: faker.person.firstName() + " " + lastName,
    parentDOB: faker.date.birthdate({ min: 20, max: 65, mode: 'age' }).toISOString().split('T')[0],
    childName: faker.person.firstName() + " " + lastName,
    childDOB: faker.date.birthdate({ min: 5, max: 18, mode: 'age' }).toISOString().split('T')[0],
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(['eligible', 'notEligible', 'couldNotCheck', 'error']),
    applicationDate: getRandomDateWithinRange(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
  };
}

// Generate multiple applications
const generateApplications = () => {
  const applications = [];
  for (let i = 0; i < 100; i++) {
    applications.push(generateApplication());
  }
  return applications;
};

// Write applications data to a file
const generateApplicationsFile = (filePath) => {
  const applications = generateApplications();
  const filedata = JSON.stringify(applications, null, 2);
  fs.writeFile(filePath, filedata, (error) => {
    if (error) {
      console.error('Error writing applications file:', error);
    } else {
      console.log(`Applications generated: ${filePath}`);
    }
  });
};

// Generate applications and write to file
generateApplicationsFile(path.join(__dirname, '../app/data/batch-check-school.json'));
