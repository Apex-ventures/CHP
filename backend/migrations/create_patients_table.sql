CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    shin VARCHAR UNIQUE,
    name VARCHAR,
    dob DATE,
    email VARCHAR,
    phone VARCHAR,
    address VARCHAR,
    gender VARCHAR,
    insurance VARCHAR,
    policy_number VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);