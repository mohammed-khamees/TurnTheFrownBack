const mongoose = require('mongoose');

const record = new mongoose.Schema({
	amountOfTurn: String,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Record', record);
