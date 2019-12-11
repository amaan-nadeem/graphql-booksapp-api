const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("book", BookSchema);