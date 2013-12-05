var token = require('../config').github;
var github = require('../lib/github')(token);


testUsers();

function testUsers() {
    github.users('location:Jyväskylä', function(err, d) {
        if(err) return console.error(err);

        console.log(d);
    });
}
