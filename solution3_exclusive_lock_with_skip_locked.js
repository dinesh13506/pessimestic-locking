require('./connection');
const database = require('./database');

let book = async function(user_id) {

    database.getSeatWithExclusiveLockWithSkip(user_id).then((results) => {
        console.log("ans " , user_id, results);
    });
}

for(let user_id = 1; user_id <= 120; user_id++) {
    book(user_id);
}