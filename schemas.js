var sugar = require('object-sugar');
var schema = sugar.schema();


schema(exports, 'Geek').fields({
    ghid: Number,
    nick: String,
    name: String,
    gravatar_id: String,
    followers: Number,
    following: Number,
    repos: Number,
    language: String,
    blog: String,
    bio: String,
    company: String,
    type:String
});
