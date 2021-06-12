const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    text: {type: String, required: true},
    publishDate: {type: Number, required: true},
    author: {type: Types.ObjectId}
});

module.exports = model("Comment", schema);