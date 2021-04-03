const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    publish: {type: Number, required: true},
    author: {type: Types.ObjectId, required: true},
    views: {type: Number}  
});

module.exports = model("Post", schema);