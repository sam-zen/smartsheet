const express = require('express');
const axios = require('axios');
const {sheetsControllers} = require('../controllers/');
const {sheetsModel} = require('../models/');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', sheetsControllers.getAll )
router.get('/:id', sheetsControllers.getOne )
router.put('/:id/rows', sheetsControllers.updateRow )
router.post('/:id/rows', sheetsControllers.createRow )
router.post('/', sheetsControllers.create )

module.exports = router;	