const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: { type: String, required: true, trim: true, lowercase: true },
});

// Hashed the password
user.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, 10);
});

// BASIC AUTH
user.statics.authenticateBasic = async function (username, pass) {
	try {
		const user = await this.findOne({ username });
		if (!user) return ["The username doesn't exist", 404];

		const valid = await bcrypt.compare(pass, user.password);

		if (valid) {
			const payload = {
				userId: user._id,
			};

			const options = {
				expiresIn: '60m',
			};

			return [jwt.sign(payload, process.env.SECRET, options), 200];
		}

		return ['Invalid Username or Password', 403];
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = mongoose.model('User', user);
