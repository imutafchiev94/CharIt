var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    sum: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },charity:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Charity"
    },target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Target"
    },createdBy: String,
    updatedBy: String,
    deletedBy: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date

});


module.exports = mongoose.model("Order", orderSchema);