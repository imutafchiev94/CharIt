const Charity = require('../models/charity');
const User = require('../models/user');
const Target = require('../models/target');

async function getAll() {
    let charities = await Charity.find({deletedAt: null}).populate("targets").lean();
    return charities;
}

async function getOneById (id) {
    let charity = await Charity.findById(id).populate("targets").lean();
    return charity;
}

async function getAllCharitiesByUserId(userId) {
    let user = await User.findById(userId).populate("charities");
    let charities = user.charities.lean();

    return charities;
}

async function getCharityByTargetId(targetId) {
    let target = await Target.findById(targetId).populate("charity");
    let charity = target.charity.lean();

    return charity;
}

module.exports = {
    getAll,
    getOneById,
    getAllCharitiesByUserId,
    getCharityByTargetId
}