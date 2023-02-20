require('./connection');
let database = require('./database');

async function provision() {
    console.log("======= CLEAN UP STARTED =======");
    await database.cleanTable('seats');
    await database.cleanTable('users');
    await database.cleanTable('trips');
    await database.cleanTable('flights');
    await database.cleanTable('airlines');
    await console.log("======= CLEAN UP DONE =======");
    let airlines = [
        { id : 1, name : 'Indigo Airlines'}
    ];
    for(let airline of airlines) {
        await database.addAirline(airline.id, airline.name);
    }
    
    let flights = [
        {flight_id : 1, airline_id: 1, flight_name : 'Indigo 2023'}
    ];
    
    for(let flight of flights) {
        await database.addFlight(flight.flight_id, flight.flight_name, flight.airline_id);
    }
    
    let trips = [
        {trip_id : 1, flight_id : 1, fligh_time : '0000-00-00 00:00:00'}
    ]
    
    for(let trip of trips) {
        await database.addTrip(trip.trip_id, trip.flight_id, trip.fligh_time);
    }

    //add 120 users
    for(let user_id = 1; user_id <= 120; user_id++) {
        await database.addUser(user_id, `username_${user_id}`);
    }

    //add 120 seats
    let seat_id = 0;
    for(let col_no = 1; col_no <= 20; col_no++) {
        for(let row_no of ['A','B','C','D','E','F']) {
            seat_id++;
            await database.addSeat(seat_id, `${col_no}${row_no}`,1);
        }
    }
}

provision();

module.exports = {
    provision : provision
}



