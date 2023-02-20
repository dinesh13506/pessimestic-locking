let conn = require('./connection');


let execTransaction = async () => {
    try {
        pool.getConnection(async (err, conn) => {
            if(err) {
                console.log(err);
                console.error("unable to get connection from pool");
                return;
            }
            else {
                try {
                    await conn.beginTransaction();
                    try {
                        await conn.query('select * from users');
                        await conn.query('UPDATE users SET username  = ? WHERE username = ?',['username_120', 'username_121']);
                        await conn.commit();
                    } catch(err) {
                        console.error("error while executing transaction");
                        conn.rollback();
                    }
                } catch(err) {
                    console.log(err);
                    console.error("unable to start transaction");
                }
            }
        })
    } catch(err) {
        console.log(err);
        console.error("unable to getConnection");
    }

    return Promise.resolve(1);
    
}

execTransaction();