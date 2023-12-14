const Database = require('better-sqlite3');

const db = new Database('mydatabase.db');

db.exec(`
CREATE TABLE IF NOT EXISTS patients (
    patientid TEXT PRIMARY KEY,
    patientlastname TEXT,
    patientfirstname TEXT,
    patientmiddlename TEXT,
    dateofbirth TEXT,
    sex TEXT,
    age INTEGER,
    requesting_physician TEXT
  );
`);

module.exports = db;