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
  const PolishName = generateNameInLocale('pl');
  const UkranianName = generateNameInLocale('uk');
  const ChineseTaiwanName = generateNameInLocale('zh_TW');

}

const generateApplication = () => {
  let application = {}
  //const application = {};

  /// Application ID
  application.id = faker.number.int({ min: 39000000, max: 99999999 });

  //Parent name - needs to use same as childdetails.lastname
//application.parentDetails.firstName = faker.person.firstName();

  //Parent dob
  //application.parentDetails.dob = faker.date.birthdate({ mode:'year',min: 1970, max: 1995 }).toISOString().split('T')[0];

  //Parent NINO or ASR

  //if no NINO then display ASR

  //Parent email
  //application.parentDetails.randomEmail = faker.internet.email();

  // Child name
application.childDetails = {}
application.childDetails.firstName = faker.person.firstName()
application.childDetails.lastName = faker.person.lastName()

  // Child DOB
application.dob = faker.date.birthdate({ mode:'year',min: 2018, max: 2021 }).toISOString().split('T')[0];

  // Application Status
application.status = {};
application.status.yes = faker.helpers.arrayElement([
'Entitled',
'Entitled',
'Evidence needed',
'Entitled',
'Evidence needed',
'Sent for review',
'Review entitled',
'Evidence needed',
'Receiving entitlement',
]);

// Eligible date between September 5, 2024, and today
application.eligible = {};
const eligibleDate = faker.date.between({ from: '2024-09-05', to: new Date() });
application.eligible.date = eligibleDate.toISOString().split('T')[0];

// Calculate the submission date range (3 weeks to 6 months before the eligible date)
const threeWeeksBefore = new Date(eligibleDate);
threeWeeksBefore.setDate(threeWeeksBefore.getDate() - 21);

const sixMonthsBefore = new Date(eligibleDate);
sixMonthsBefore.setMonth(sixMonthsBefore.getMonth() - 6);

// Generate a random submission date within the calculated range
application.submission = {};
const submissionDate = getRandomDateWithinRange(sixMonthsBefore, threeWeeksBefore);
application.submission.date = submissionDate.toISOString().split('T')[0];

  // Submission date
 // application.submission = {};
 //application.submission.date = faker.date.past(2).toISOString().split('T')[0]; // Random past date */

  // Eligible from date
  application.eligible = {};
  application.eligible.date = faker.date.between({ from: '2024-09-05', to: new Date() }).toISOString().split('T')[0];

  return application
}
/*
const generateApplications = (count) => {
  const applications = [];
  for (let i = 0; i < count; i++) {
    applications.push(generateApplication());
  }
  return applications;
};
*/

const generateApplications = () => {
  const applications = []

  for(let i = 0; i < 100; i++) {
    applications.push(generateApplication())
  }

  return applications
}

const generateApplicationsFile = (filePath) => {
  const applications = generateApplications()
  const filedata = JSON.stringify(applications, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Applications generated: ${filePath}`)
    }
  )
}

generateApplicationsFile(path.join(__dirname, '../app/data/applications.json'))