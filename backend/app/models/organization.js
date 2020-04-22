const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: {createdAt: 'created_at', updatedAt: 'last_updated'},
};

const organizationSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    organization_id: String,
    name: String,
    country: String,
    description: String,
    address: String,
    phone: String,
    owner_name: String,
    createdDate: String,
    otherDetails: {type: Object}
}, schemaOptions);

var Organization = mongoose.model('organization', organizationSchema);
module.exports = Organization;
