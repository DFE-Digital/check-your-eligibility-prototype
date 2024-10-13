const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const generateApplication = () => {
    let application = {}
    //const application = {};

    /// Application ID
    application.id = faker.number.int({ min: 39000000, max: 99999999 });


    return application
}

const generatereferences = () => {
  const applications = []

  for(let i = 0; i < 100; i++) {
    applications.push(generateApplication())
  }

  return applications
}

const generateApplicationsFile = (filePath) => {
  const applications = generatereferences()
  const filedata = JSON.stringify(applications, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`References generated: ${filePath}`)
    }
  )
}

generateReferencesFile(path.join(__dirname, '../app/data/references.json'))