import { Request, Response } from 'express';
import { Pool } from 'pg';
import { pool } from '../db'; // Assuming your database pool is exported from backend/src/db/index.ts

export const enrollPatient = async (req: Request, res: Response) => {
  try {
    const { shin, name, dob, email, phone, address, gender, insurance, policy_number } = req.body;

    // Basic validation (you'll want more robust validation)
    if (!shin || !name || !dob) {
      return res.status(400).json({ message: 'Missing required fields: shin, name, or dob' });
    }

    const client = await pool.connect();

    try {
      const query = `
        INSERT INTO patients (shin, name, dob, email, phone, address, gender, insurance, policy_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id;
      `;
      const values = [shin, name, dob, email, phone, address, gender, insurance, policy_number];

      const result = await client.query(query, values);
      const newPatientId = result.rows[0].id;

      res.status(201).json({ message: 'Patient enrolled successfully', patientId: newPatientId });

    } finally {
      client.release(); // Release the client back to the pool
    }

  } catch (error) {
    console.error('Error enrolling patient:', error);
    res.status(500).json({ message: 'Internal server error during patient enrollment' });
  }
};