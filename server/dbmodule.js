exports.dbPool = function () {
    const {
      Pool
    } = require('pg')
    console.log('connecting to db pool')
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false},
      max: 20
    })
  
    return pool
  }