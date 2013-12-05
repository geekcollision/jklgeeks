var token = require('../config').github;
var github = require('../lib/github')(token);


testUser();

function testUser() {
    github.user('alexlawrence', function(err, d) {
        if(err) return console.error(err);

        console.log(d);
    });
}
