const express = require('express');
const router = express.Router();
const errorService = require('../../services/error.service');
const {CustomError} = require("../../utils/errors");

// routes
router.post('/', logError);
module.exports = router;

async function logError(req, res, next) {
    const errorParams  = new CustomError(req.body.description, req.body.label)
    await errorService.create(errorParams);
}

