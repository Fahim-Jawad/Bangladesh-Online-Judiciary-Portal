const express = require('express')
const { generaladminuser } = require('../controllers/generaladminuser')
const router = express.Router()

router.get('/generaladminuser', generaladminuser)

module.exports = router