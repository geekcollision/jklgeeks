var sugar = require('object-sugar');
var schema = sugar.schema();

var schemas = {};

module.exports = schemas;


schema(schemas, 'Geek').fields({
    nick: String,
    name: String,
    gravatar_id: String,
    followers: Number,
    following: Number,
    repos: Number,
    language: String,
    blog: String,
    bio: String,
    company: String
});
