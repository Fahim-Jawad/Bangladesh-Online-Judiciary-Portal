const express = require('express')
const { officeruser } = require('../controllers/officeruser')
const router = express.Router()

router.get('/officeruser', officeruser)

module.exports = router