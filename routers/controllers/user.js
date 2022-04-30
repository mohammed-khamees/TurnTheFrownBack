const userModel = require('./../../db/models/user');

const signUp = (req, res) => {
	const { username, password } = req.body;

	const user = new userModel({
		username,
		password,
	});

	user
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

const login = (req, res) => {
	const { username, password } = req.body;

	userModel
		.authenticateBasic(username, password)
		.then((result) => {
			if (result[1] === 200)
				return res.status(result[1]).json({ token: result[0] });

			res.status(result[1]).json(result[0]);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

module.exports = {
	signUp,
	login,
};
