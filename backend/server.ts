import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

import { Client } from 'pg';

dotenv.config();

const app = express();
app.use(express.json());

  if (!OPENEMR_API_URL) {
    // No longer forwarding to OpenEMR, so this check is not needed here.
    // You might want to remove or modify this based on your needs.
    // console.error('OPENEMR_API_URL environment variable is not set.');
    // return res.status(500).json({ error: 'Internal server error: OpenEMR API URL not configured.' });
  }

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set.');
    return res.status(500).json({ error: 'Internal server error: Database URL not configured.' });
  }

  try {
    const patientData = req.body; // Assuming patientData includes SHIN, name, dob, email, phone, address, gender, insurance, policy_number
    const { shin, name, dob, email, phone, address, gender, insurance, policy_number } = patientData;

    const dbClient = new Client({
      connectionString: DATABASE_URL,
    });

    await dbClient.connect();

    const insertQuery = `
      INSERT INTO patients (shin, name, dob, email, phone, address, gender, insurance, policy_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;

    const result = await dbClient.query(insertQuery, [shin, name, dob, email, phone, address, gender, insurance, policy_number]);
    console.log('Patient data inserted into PostgreSQL with ID:', result.rows[0].id);

    await dbClient.end();

    res.status(201).json({ message: 'Patient enrolled successfully', patientId: result.rows[0].id });
  } catch (error: any) {
    console.error('Error processing enroll-patient request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const PORT = process.env.PORT || 3001; // Use a different port than the frontend

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});