const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String,  requierd: true, unique: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
    bio: {type: String},
    posts: [{type: Types.ObjectId, ref: 'Post'}]
});

module.exports = model("User", schema);