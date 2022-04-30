const express = require('express');
const {
	getAllRecords,
	getUserRecords,
	addNewRecord,
} = require('./../controllers/record');

// middlewares
const authentication = require('../middlewares/authentication');

const recordRouter = express.Router();

recordRouter.get('/', getAllRecords);
recordRouter.get('/:user', authentication, getUserRecords);
recordRouter.post('/', authentication, addNewRecord);

module.exports = recordRouter;
