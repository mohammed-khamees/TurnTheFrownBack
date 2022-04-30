const recordModel = require('./../../db/models/record');

const getAllRecords = (req, res) => {
	recordModel
		.find({})
		.populate('user', 'username -_id')
		.then((result) => {
			res
				.status(200)
				.json(
					result.sort(
						(a, b) => Number(b.amountOfTurn) - Number(a.amountOfTurn),
					),
				);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const getUserRecords = (req, res) => {
	const { user } = req.params;
	recordModel
		.find({ user })
		.populate('user', 'username -_id')
		.then((result) => {
			res
				.status(200)
				.json(
					result.sort(
						(a, b) => Number(b.amountOfTurn) - Number(a.amountOfTurn),
					),
				);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const addNewRecord = (req, res) => {
	const record = new recordModel(req.body);

	record
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

module.exports = {
	getAllRecords,
	getUserRecords,
	addNewRecord,
};
