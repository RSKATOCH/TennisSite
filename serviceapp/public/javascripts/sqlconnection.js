var mysql      = require('mysql');
var util = require('util');
var connection = mysql.createPool({
  connectionLimit: 10,
  host     : 'your-host',
  user     : 'your-username',
  password : 'your-password',
  database : 'your-database'
});
connection.getConnection((err, connection) => {
  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
      }
  }
  if (connection) connection.release()
  return
})
connection.query = util.promisify(connection.query)
module.exports = connection;