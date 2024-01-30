import pg from 'pg'

const db = new pg.Pool({    // We can also Client instead of Pool but Pool give us the benefit of Connection Pooling      
    user : 'postgres',
    host : 'localhost',
    database : 'threads',
    password : '12345',
    port : 5432,
    max : 20,                        // Pool of available connections
    connectionTimeoutMillis : 0,     // Amount of time you should wait for a pool to give you a connection if all the connections are busy. 0 indicates that you should wait forever
    idleTimeoutMillis : 0,            // Amount of time you should wait to close the connection , If the connections are not used . 0 indicates that you should wait forever
});

export default db;