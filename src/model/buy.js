const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    date: {
        type: Date,
        required: true
    }
});

const Buy = mongoose.model('Buy', buySchema);

module.exports = Buy;