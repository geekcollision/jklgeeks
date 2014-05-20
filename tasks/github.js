'use strict';

var async = require('async');
var sugar = require('object-sugar');

var token = require('../config').github;
var github = require('../lib/github')(token);
var Geek = require('../schemas').Geek;


module.exports = function(cb) {
    github.users('location:Jyväskylä', function(err, d) {
        if(err) {
            return console.error(err);
        }

        async.each(d.users, function(user, cb) {
            github.user(user.username, function(err, user) {
                if(err) {
                    return cb(err);
                }

                sugar.getOrCreate(Geek, {
                    ghid: user.id
                }, function(err, d) {
                    if(err) {
                        return cb(err);
                    }

                    sugar.update(Geek, d._id, {
                        nick: user.login,
                        name: user.name,
                        gravatar_id: user.gravatar_id,
                        followers: user.followers,
                        following: user.following,
                        repos: user.public_repos,
                        language: user.language, // TODO: aggregate languages based on repos
                        blog: user.blog,
                        bio: user.bio,
                        company: user.company,
                        type: user.type.toLowerCase()
                    }, cb);
                });
            });
        }, cb);
    });
};

