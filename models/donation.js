var mongoose = require("mongoose");

var donationSchema = new mongoosse.Schema({
    sum: {
        type: Number,
        required: true,
    },
    target:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Target"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isDone: Boolean,
    createdBy: String,
    updatedBy: String,
    deletedBy: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
});


module.exports = mongoose.model("Donation", donationSchema);