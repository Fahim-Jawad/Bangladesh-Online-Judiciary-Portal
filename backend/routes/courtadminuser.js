const express = require('express')
const { courtadminuser } = require('../controllers/courtadminuser')
const router = express.Router()

router.get('/courtadminuser', courtadminuser)

module.exports = router