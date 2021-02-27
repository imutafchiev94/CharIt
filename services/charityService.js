const Charity = require('../models/charity');
const User = require('../models/user');
const Target = require('../models/target');
const charity = require('../models/charity');

async function getAll() {
    let charities = await Charity.find({deletedAt: null}).populate("target").lean();
    return charities;
}

async function getOneById (id) {
    let charity = await Charity.findById(id).populate("target").lean();
    return charity;
}

async function getManyByArrayOfId(arr) {
    let charities = [];
    console.log(arr[0]);
    for (let i = 0; i < arr.length; i++) {
        let charity = await Charity.findById(arr[i]).populate("target").lean();
        
        charities.push(charity);

    }
    return charities;
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
    getCharityByTargetId,
    getManyByArrayOfId
}