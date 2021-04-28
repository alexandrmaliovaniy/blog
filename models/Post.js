const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    titleImage: {type: String, required: true},
    content: {type: String, required: true},
    description: {type: String, required: true},
    publishDate: {type: Number, required: true},
    authorLogin: {type: String, required: true},
    votes: {type: Number},
    records: {type: Object}
});

module.exports = model("Post", schema);