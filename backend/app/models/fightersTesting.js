const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: {createdAt: 'created_at', updatedAt: 'last_updated'},
};

const fightersTestingSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    fighter_id: String,
    name: String,
    country: String,
    deathDate: String,
    description: String,
    age: String,
    occupation: String,
    source: String,
    link: String,
    photo: {data: Buffer, contentType: String}
}, schemaOptions);

var fightersTesting = mongoose.model('fightersTesting', fightersTestingSchema);
module.exports = fightersTesting;
