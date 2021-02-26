const User = require('../models/user');

async function getUserById(id) {
    let user = await User.findById(id).populate("role").populate("charities").populate("products").lean();

    return user;
} 

async function getUserByEmail(email) {
    let user = await User.findOne({email: email}).populate("role").populate("charities").populate("products").lean();

    return user;
}

module.exports = {
    getUserById,
    getUserByEmail,
}