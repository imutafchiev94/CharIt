const Charity = require("../models/charity");

async function getAllByCharityId(charityId) {
    const charity = await Charity.findById(charityId).populate("targets");
    const targets = charity.targets;

    return targets;
}


module.exports = {
    getAllByCharityId
}