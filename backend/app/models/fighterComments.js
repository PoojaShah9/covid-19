const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: {createdAt: 'created_at', updatedAt: 'last_updated'},
};

const fighterCommentsSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    fighterCommentsId: String,
    fighter_id: String,
    comment: String
}, schemaOptions);

var fighterComments = mongoose.model('fighterComments', fighterCommentsSchema);
module.exports = fighterComments;
