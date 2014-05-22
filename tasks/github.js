'use strict';

var async = require('async');
var sugar = require('object-sugar');
var prop = require('annofp').prop;

var token = require('../config').github;
var github = require('../lib/github')(token);
var schemas = require('../schemas');
var Geek = schemas.Geek;
var Organization = schemas.Organization;


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

                if(user.type === 'Organization') {
                    updateOrganization(user, cb);
                }
                else {
                    updateGeek(user, cb);
                }
            });
        }, cb);
    });
};

function updateOrganization(org, cb) {
    github.members(org.login, function(err, members) {
        if(err) {
            return cb(err);
        }

        sugar.getOrCreate(Organization, {
            ghid: org.id
        }, function(err, d) {
            if(err) {
                return cb(err);
            }

            sugar.update(Organization, d._id, {
                nick: org.login,
                name: org.name,
                gravatar_id: org.gravatar_id,
                repos: org.repos,
                blog: org.blog,
                members: members.map(prop('id'))
            }, cb);
        });
    });
}

function updateGeek(user, cb) {
    sugar.getOrCreate(Geek, {
        ghid: user.id
    }, function(err, d) {
        if(err) {
            return cb(err);
        }

        // TODO: aggregate languages based on repos
        sugar.update(Geek, d._id, {
            nick: user.login,
            name: user.name,
            gravatar_id: user.gravatar_id,
            followers: user.followers,
            following: user.following,
            repos: user.public_repos,
            blog: user.blog || null,
            bio: user.bio || null,
            company: user.company || null
        }, cb);
    });
}
