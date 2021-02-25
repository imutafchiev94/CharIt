var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    city: String,
    firstName: String,
    lastName: String,
    age: Number,
    isEmailVerified: Boolean,
    avatar: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    charities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Charity"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    createdBy: String,
    updatedBy: String,
    deletedBy: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
    
});

module.exports = mongoose.model("User", userSchema);