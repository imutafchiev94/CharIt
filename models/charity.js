var mongoose = require("mongoose");

var charitySchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    target:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Target"
    },
    email: {
        type: String,
        required: true,
        validate: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    },
    phoneNumber: {
        type: String,
        required: true, 
        validate: /^\(([0-9]{2,5}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{3,4}[- ]*[0-9]{3,6}$/
    },
    iban: { 
        type: String,
        required: true,
        validate: /^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$/
    }, 
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    createdBy:String,
    updatedBy:String,
    deletedBy:String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    isApproved: Boolean,
});

module.exports = mongoose.model("Charity", charitySchema);