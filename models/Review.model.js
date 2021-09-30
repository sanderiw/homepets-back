const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema({
    author: { type: Types.ObjectId, ref: 'User', required: true },
    to: {
        type: new Schema({
            toUser: { type: Types.ObjectId, ref: 'User' },
            toAd: { type: Types.ObjectId, ref: 'Ad' },
        }),
        required: true,
    },
    text: { type: String, trim: true, maxlength: 500, required: true },
    date: { type: Date, default: Date.now },
    stars: { type: Number, enum: [1, 2, 3, 4, 5], required: true },
});

module.exports = model('Review', reviewSchema);
