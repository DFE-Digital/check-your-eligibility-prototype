// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
// Add your routes here - above the module.exports line


const _ = require('lodash')
const express = require('express')
const { fakerEN_GB: faker } = require('@faker-js/faker')
const moment = require('moment')
const path = require('path')
//const router = express.Router()
const url = require('url')
//const utils = require('./lib/utils')
//const permissions = require('./filters/permissions.js').filters
const fs = require('fs')




// =============================================================================
// Individual route files
// =============================================================================

// =============================================================================
// Title
// =============================================================================
require('./routes/folder')(router)


module.exports = router