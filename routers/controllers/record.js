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
						(a, b) => Number(a.amountOfTurn) - Number(b.amountOfTurn),
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
		.findOne({ user })
		.populate('user', 'username -_id')
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const addNewRecord = async (req, res) => {
	const { user, amountOfTurn } = req.body;

	const found = await recordModel.findOne({ user });

	if (found) {
		recordModel
			.findOneAndUpdate({ user }, { amountOfTurn }, { new: true })
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	} else {
		const record = new recordModel(req.body);

		record
			.save()
			.then((result) => {
				res.status(201).json(result);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
};

module.exports = {
	getAllRecords,
	getUserRecords,
	addNewRecord,
};
