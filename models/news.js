const mongoose = require('mongoose');

let NewsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: String,
    updatedBy: String,
    deletedBy: String,
    createdOn: Date,
    updatedOn: Date,
    deletedOn: Date,
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    imageUrl: {
        type: String, required: true, 
        validate: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    },
    charity: {
        type: mongoose.Schema.ObjectId,
        ref: "Charity",
        required: false
    }
})

module.exports = mongoose.model("News", NewsSchema);