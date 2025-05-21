import request from 'node-fetch';
import { Server } from 'http';
import { pool } from '../db/index'; // Assuming your database pool is exported from backend/src/db/index.ts
import { app } from '../server'; // Assuming your Express app is exported from backend/src/server.ts

let server: Server;
const TEST_PORT = process.env.PORT || 3001; // Use a different port for testing

describe('Patient Enrollment Integration', () => {
  beforeAll(async () => {
    // Start the backend server
    await new Promise<void>((resolve) => {
      server = app.listen(TEST_PORT, () => {
        console.log(`Test server running on port ${TEST_PORT}`);
        resolve();
      });
    });

    // Ensure database connection
    try {
      await pool.query('SELECT 1');
      console.log('Database connected for testing');
    } catch (error) {
      console.error('Database connection failed for testing:', error);
      process.exit(1); // Exit if database connection fails
    }
  });

  afterAll(async () => {
    // Stop the backend server
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error('Error closing test server:', err);
          reject(err);
        } else {
          console.log('Test server closed');
          resolve();
        }
      });
    });

    // Close the database connection pool
    await pool.end();
    console.log('Database connection pool closed');
  });

  test('should enroll a patient successfully', async () => {
    const patientData = {
      shin: 'SHIN12345',
      name: 'John Doe',
      dob: '1990-05-15',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      gender: 'Male',
      insurance: 'AnyInsurance',
      policy_number: 'POLICY9876',
    };

    // Use a placeholder token for testing. In a real scenario, you'd obtain this via a login endpoint.
    const placeholderToken = 'fake-jwt-token'; // Replace with a valid test token if needed

    // Make a POST request to the enrollment endpoint
    const response = await request(`http://localhost:${TEST_PORT}/api/v1/enroll-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${placeholderToken}`,
      },
      body: JSON.stringify(patientData),
    });

    // Assert that the response status is 200 (or 201 for created)
    expect(response.status).toBe(200); // Or expect(response.status).toBe(201); depending on your implementation

    // Query the database to verify insertion
    const result = await pool.query('SELECT * FROM patients WHERE shin = $1', [patientData.shin]);

    expect(result.rows.length).toBe(1);
    const insertedPatient = result.rows[0];

    expect(insertedPatient.shin).toBe(patientData.shin);
    expect(insertedPatient.name).toBe(patientData.name);
    // Add assertions for other fields as needed

    // Clean up the inserted data
    await pool.query('DELETE FROM patients WHERE shin = $1', [patientData.shin]);
  });

  // Add more test cases as needed (e.g., for invalid data, missing token, duplicate SHIN)
});