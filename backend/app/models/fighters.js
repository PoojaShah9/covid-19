const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: {createdAt: 'created_at', updatedAt: 'last_updated'},
};

const fighterSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    fighter_id: String,
    name: String,
    country: String,
    deathDate: String,
    description: String,
    age: String,
    occupation : String,
    photo: {type: Object}
}, schemaOptions);

var Fighters = mongoose.model('fighters', fighterSchema);
module.exports = Fighters;
