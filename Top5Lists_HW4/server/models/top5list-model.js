const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        datePublished: { type: Date, required: false },
        views: { type: Number, required: false },
        liked: { type: [String], required: false },
        disliked: { type: [String], required: false },
        comments: { type: [String], required: false }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
