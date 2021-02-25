var mongoose = require("mongoose");

var targetSchema = new mongoose.Schema({
    targetSum: Number,
    currentSum: Number,
    title: String,
    description: String,
    charity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Charity"
    },
    createdBy: String,
    updatedBy: String,
    deletedBy: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});

module.exports = mongoose.model("Target", targetSchema);

