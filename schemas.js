'use strict';

var _extend = require('util')._extend;

var sugar = require('object-sugar');
var schema = sugar.schema();


var common = {
    ghid: Number,
    nick: String,
    name: String,
    gravatar_id: String,
    repos: Number,
    blog: String
};

schema(exports, 'Geek').fields(extend(common, {
    followers: Number,
    following: Number,
    bio: String,
    company: String
}));

schema(exports, 'Organization').fields(extend(common, {
    members: Array
}));

function extend(a, b) {
    return _extend(_extend({}, a), b);
}
