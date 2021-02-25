const Charity = require("../models/charity");

async function getAllByCharityId(charityId) {
    const charity = await Charity.findById(charityId).populate("targets");
    const targets = charity.targets.lean();

    return targets;
}


module.exports = {
    getAllByCharityId
}