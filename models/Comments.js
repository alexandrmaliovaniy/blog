const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    postId: {type: Types.ObjectId, reqired: true},
    comments: [{type: Types.ObjectId}]
});

module.exports = model("Comments", schema);