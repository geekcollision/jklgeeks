var token = require('../config').github;
var github = require('../lib/github')(token);


main();

function main() {
    testUsers();
    testUser();
}

function testUsers() {
    github.users('location:Jyväskylä', function(err, d) {
        if(err) return console.error(err);

        console.log(d);
    });
}

function testUser() {
    github.user('alexlawrence', function(err, d) {
        if(err) return console.error(err);

        console.log(d);
    });
}
