const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'bbcguei4spx29tmnznw2-mysql.services.clever-cloud.com',
  user: 'unpgg5y9gtqk9dtv',
  password: 'RhhqXH9QMQcbu4hZSfyi',  // replace with Clever Cloud password
  database: 'bbcguei4spx29tmnznw2',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
  } else {
    console.log('✅ Connected to Clever Cloud MySQL!');
  }
});

