

let dropTable = function(table_name) {
    return new Promise((resolve, reject) => {
        global.pool.query('DROP TABLE ?', [table_name], function (error, results, fields) {
            if (error) {
                reject(error)
            };
            //console.log('dropTable: ', results);
            resolve(results);
        });
    })
    
}

let cleanTable = function(table_name) {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM ` + table_name;
        global.pool.query(query, function (error, results, fields) {
            if (error) {
                reject(error)
            };
            //console.log('cleanTable: ', results);
            resolve(results);
        });
    })
    
}

let addAirline = function(id, name) {
    return new Promise((resolve, reject) => {
        global.pool.query('INSERT INTO airlines(airline_id, airline_name) VALUES(?, ?)', [id, name], function (error, results, fields) {
            if (error) { reject(error)};
            //console.log('addAirline: ', results);
            resolve(results);
        });
    });
    
}

let addFlight =  function(id, name, airline_id) {
    return new Promise((resolve, reject) => {
        global.pool.query('INSERT INTO flights(flight_id, flight_name, airline_id) VALUES(?, ?, ?)', [id, name, airline_id], function (error, results, fields) {
            if (error) {reject(error)};
            //console.log('addFlight: ', results);
            resolve(results);
        });
    })
    
}

let addTrip = function(trip_id, flight_id, fligh_time) {
    return new Promise((resolve, reject) => {
        global.pool.query('INSERT INTO trips(trip_id, flight_id, fligh_time) VALUES(?, ?, ?)', [trip_id, flight_id, fligh_time], function (error, results, fields) {
            if (error) reject(error);
            //console.log('addTrip: ', results);
            resolve(results);
        });
    })
    
}

let addUser = function(user_id, user_name) {
    return new Promise((resolve, reject) => {
        global.pool.query('INSERT INTO users(user_id, username) VALUES(?, ?)', [user_id, user_name], function (error, results, fields) {
            if (error) reject(error);
            //console.log('addUser: ', results);
            resolve(results);
        });
    })
    
}

let addSeat= function(seat_id, seat_name, trip_id) {
    return new Promise((resolve, reject) => {
        global.pool.query('INSERT INTO seats(seat_id, seat_name, trip_id) VALUES(?, ?, ?)', [seat_id, seat_name, trip_id], function (error, results, fields) {
            if (error) reject(error);
            //console.log('addSeat: ', results);
            resolve(results);
        });
    })
    
}

let getSeatWithoutLock = async function(user_id) {
    try {
        var mysql = require('mysql');
        let conn = await mysql.createConnection({
            host            : 'localhost',
            user            : 'root',
            password        : 'root',
            database        : 'test'
        });
        await conn.beginTransaction();
        conn.query('select * from seats where user_id = ? LIMIT 1',[0], async (err, results) => {
            if(err) {
                console.error("err in select", err);
                conn.rollback();
            }
            else {
                console.log(results);
                await conn.query('update seats set user_id = ? where seat_id = ?',[user_id, results[0].seat_id]);
                conn.commit();
                Promise.resolve(results);
            }
        })
    } catch(err) {
        console.error("unable to beginTransaction", err);
    }
}


let getSeatWithExclusiveLock = async function(user_id) {
    try {
        var mysql = require('mysql');
        let conn = await mysql.createConnection({
            host            : 'localhost',
            user            : 'root',
            password        : 'root',
            database        : 'test'
        });
        await conn.beginTransaction();
        conn.query('select * from seats where user_id = ? LIMIT 1 FOR UPDATE',[0], async (err, results) => {
            if(err) {
                console.error("err in select", err);
                conn.rollback();
            }
            else {
                console.log(results);
                await conn.query('update seats set user_id = ? where seat_id = ?',[user_id, results[0].seat_id]);
                conn.commit();
                Promise.resolve(results);
            }
        })
    } catch(err) {
        console.error("unable to beginTransaction", err);
    }
}

let getSeatWithExclusiveLockWithSkip = async function(user_id) {
    try {
        var mysql = require('mysql');
        let conn = await mysql.createConnection({
            host            : 'localhost',
            user            : 'root',
            password        : 'root',
            database        : 'test'
        });
        await conn.beginTransaction();
        conn.query('select * from seats where user_id = ? LIMIT 1 FOR UPDATE SKIP LOCKED',[0], async (err, results) => {
            if(err) {
                console.error("err in select", err);
                conn.rollback();
            }
            else {
                console.log(results);
                await conn.query('update seats set user_id = ? where seat_id = ?',[user_id, results[0].seat_id]);
                conn.commit();
                Promise.resolve(results);
            }
        })
    } catch(err) {
        console.error("unable to beginTransaction", err);
    }
}


let getSeatWithExclusiveLockWithNoWait = async function(user_id) {
    try {
        var mysql = require('mysql');
        let conn = await mysql.createConnection({
            host            : 'localhost',
            user            : 'root',
            password        : 'root',
            database        : 'test'
        });
        await conn.beginTransaction();
        conn.query('select * from seats where user_id = ? LIMIT 1 FOR UPDATE NOWAIT',[0], async (err, results) => {
            if(err) {
                console.error("err in select", err);
                conn.rollback();
            }
            else {
                console.log(results);
                await conn.query('update seats set user_id = ? where seat_id = ?',[user_id, results[0].seat_id]);
                conn.commit();
                Promise.resolve(results);
            }
        })
    } catch(err) {
        console.error("unable to beginTransaction", err);
    }
}



module.exports = {
    addAirline : addAirline,
    dropTable : dropTable,
    cleanTable : cleanTable,
    addFlight : addFlight,
    addTrip : addTrip,
    addUser : addUser,
    addSeat : addSeat,
    getSeatWithoutLock : getSeatWithoutLock,
    getSeatWithExclusiveLock : getSeatWithExclusiveLock,
    getSeatWithExclusiveLockWithSkip : getSeatWithExclusiveLockWithSkip,
    getSeatWithExclusiveLockWithNoWait : getSeatWithExclusiveLockWithNoWait
}