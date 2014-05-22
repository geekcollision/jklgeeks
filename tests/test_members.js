'use strict';

var token = require('../config').github;
var github = require('../lib/github')(token);


testMembers();

function testMembers() {
    github.members('koodilehto', function(err, d) {
        if(err) {
            return console.error(err);
        }

        console.log(d);
    });
}
