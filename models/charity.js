var mongoose = require("mongoose");

var charitySchema = new mongoose.Schema({
    title: String,
    description: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    targets:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Target"
    }],
    email: String,
    phoneNumber:String,
    iban: String,
    address: String,
    city: String,
    createdBy:String,
    updatedBy:String,
    deletedBy:String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model("Charity", charitySchema);