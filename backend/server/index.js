import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';

config();
const app = express();

(async () => {
  // Connect to the first database
  const connection1 = await mysql.createConnection({
      host: process.env.DB_IN_HOST,
      user: process.env.DB_IN_USER,
      password: process.env.DB_IN_PASSWORD,
      database: process.env.DB_IN_NAME
  });

  // Connect to the second database
  const connection2 = await mysql.createConnection({
      host: process.env.DB_EU_HOST,
      user: process.env.DB_EU_USER,
      password: process.env.DB_EU_PASSWORD,
      database: process.env.DB_EU_NAME
  });

  try {
      // Test connection to the first database
      const [rows1, fields1] = await connection1.execute('SELECT DATABASE()');
      console.log('Connected to first database:', rows1[0]['DATABASE()']);

      // Test connection to the second database
      const [rows2, fields2] = await connection2.execute('SELECT DATABASE()');
      console.log('Connected to second database:', rows2[0]['DATABASE()']);
  } catch (err) {
      console.error('Error connecting to the databases:', err);
  } finally {
      await connection1.end();
      await connection2.end();
  }
})();

// Bodyparser setup
app.use(bodyparser.json({ limit: "150mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "150mb", extended: true, parameterLimit: 50000 }));

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// cookies
app.use(cookieParser());

// Routes
app.get('/', function (req, res) {
  res.send('Welcome to our API');
});

app.get('/data', (req, res) => {
  const region = req.query.region;

  let db = region === 'India' ? indiaDb : europeDb;

  db.query('SELECT * FROM your_table', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  process.env.NODE_ENV === 'production'
    ? res.status(500).json({ message: 'Internal Server Error' })
    : res.status(500).json({
      name: err.name,
      message: err.message,
      code: err.code,
      stack: err.stack,
      error: err
    });
  console.error(err);
});

// Server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
