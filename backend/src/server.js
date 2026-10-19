import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import pool from './config/database.js';

const PORT = process.env.PORT || 3000;

// Test DB connection
pool.query('SELECT NOW()', (err) => {
  if(err) {
    console.error("DB Connection Failed:", err.message);
  } else {
    console.log("Connected to the database");
  }
});

app.listen(PORT, () => {
  console.log(`EduSpire server is running on port ${PORT}`);
});