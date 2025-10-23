import sql from './index'

// Create tables
export async function createTables() {
  // Users table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      hospital_id VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Hospitals table
  await sql`
    CREATE TABLE IF NOT EXISTS hospitals (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT,
      phone VARCHAR(20),
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Patients table
  await sql`
    CREATE TABLE IF NOT EXISTS patients (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      aadhar VARCHAR(20) UNIQUE NOT NULL,
      phone VARCHAR(20),
      email VARCHAR(255),
      age INTEGER,
      gender VARCHAR(10),
      dob DATE,
      address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Appointments table
  await sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id VARCHAR(50) PRIMARY KEY,
      patient_name VARCHAR(255) NOT NULL,
      patient_aadhar VARCHAR(20),
      age INTEGER,
      date DATE NOT NULL,
      time TIME NOT NULL,
      doctor_id VARCHAR(50) NOT NULL,
      hospital_id VARCHAR(50) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      token_no VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  // Patient History table
  await sql`
    CREATE TABLE IF NOT EXISTS patient_history (
      id VARCHAR(50) PRIMARY KEY,
      patient_id VARCHAR(50) NOT NULL,
      doctor_name VARCHAR(255) NOT NULL,
      sickness TEXT,
      treatment TEXT,
      medicine TEXT,
      scaning TEXT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (patient_id) REFERENCES patients(id)
    )
  `

  // Staff table
  await sql`
    CREATE TABLE IF NOT EXISTS staff (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      role VARCHAR(50) NOT NULL,
      hospital_id VARCHAR(50),
      department VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
}

// Seed data functions
export async function seedData() {
  // Seed hospitals
  const hospitals = [
    { id: 'H001', name: 'AyurHealth Hospital', address: '123 Ayur Lane, Bengaluru', phone: '+91-9876543210', email: 'info@ayurhealth.com' },
    { id: 'H002', name: 'HeartCare Clinic', address: '456 Health Street, Kochi', phone: '+91-9123456780', email: 'info@heartcare.com' },
    { id: 'H003', name: 'JointCare Hospital', address: '789 Clinic Road, Delhi', phone: '+91-9988776655', email: 'info@jointcare.com' },
    { id: 'H004', name: 'SkinCare Clinic', address: '321 Wellness Ave, Pune', phone: '+91-9876501234', email: 'info@skincare.com' },
    { id: 'H005', name: 'NeuroCare Hospital', address: '654 Care Blvd, Jaipur', phone: '+91-9001122334', email: 'info@neurocare.com' },
    { id: 'H006', name: 'FamilyCare Clinic', address: '987 Family Clinic, Ahmedabad', phone: '+91-9887766554', email: 'info@familycare.com' }
  ]

  for (const hospital of hospitals) {
    await sql`
      INSERT INTO hospitals (id, name, address, phone, email)
      VALUES (${hospital.id}, ${hospital.name}, ${hospital.address}, ${hospital.phone}, ${hospital.email})
      ON CONFLICT (id) DO NOTHING
    `
  }

  // Seed users (doctors)
  const users = [
    { user_id: '12345', name: 'Dr. Arya Sharma', email: 'arya.sharma@example.com', password: 'password123', role: 'admin', hospital_id: 'H001' },
    { user_id: '23456', name: 'Dr. Priya Menon', email: 'priya.menon@example.com', password: 'password123', role: 'medic', hospital_id: 'H002' },
    { user_id: '34567', name: 'Dr. Rohan Gupta', email: 'rohan.gupta@example.com', password: 'password123', role: 'staff', hospital_id: 'H003' },
    { user_id: '45678', name: 'Dr. Sneha Patil', email: 'sneha.patil@example.com', password: 'password123', role: 'medic', hospital_id: 'H004' },
    { user_id: '56789', name: 'Dr. Vikram Singh', email: 'vikram.singh@example.com', password: 'password123', role: 'admin', hospital_id: 'H005' },
    { user_id: '67890', name: 'Dr. Meera Joshi', email: 'meera.joshi@example.com', password: 'password123', role: 'staff', hospital_id: 'H006' }
  ]

  for (const user of users) {
    await sql`
      INSERT INTO users (user_id, name, email, password, role, hospital_id)
      VALUES (${user.user_id}, ${user.name}, ${user.email}, ${user.password}, ${user.role}, ${user.hospital_id})
      ON CONFLICT (user_id) DO NOTHING
    `
  }

  // Seed patients
  const patients = [
    { id: 'P001', name: 'John Doe', aadhar: '1234-5678-9012', phone: '+91-9876543210', email: 'john@example.com', age: 30, gender: 'Male', dob: '1994-01-01', address: '123 Main St, City' },
    { id: 'P002', name: 'Jane Smith', aadhar: '2345-6789-0123', phone: '+91-9123456789', email: 'jane@example.com', age: 25, gender: 'Female', dob: '1999-05-15', address: '456 Oak Ave, Town' },
    { id: 'P003', name: 'Bob Johnson', aadhar: '3456-7890-1234', phone: '+91-9988776655', email: 'bob@example.com', age: 45, gender: 'Male', dob: '1979-03-20', address: '789 Pine Rd, Village' }
  ]

  for (const patient of patients) {
    await sql`
      INSERT INTO patients (id, name, aadhar, phone, email, age, gender, dob, address)
      VALUES (${patient.id}, ${patient.name}, ${patient.aadhar}, ${patient.phone}, ${patient.email}, ${patient.age}, ${patient.gender}, ${patient.dob}, ${patient.address})
      ON CONFLICT (id) DO NOTHING
    `
  }

  // Seed appointments
  const appointments = [
    { id: 'A001', patient_name: 'John Doe', patient_aadhar: '1234-5678-9012', age: 30, date: '2024-01-15', time: '10:00', doctor_id: '12345', hospital_id: 'H001', status: 'pending', token_no: 'T001' },
    { id: 'A002', patient_name: 'Jane Smith', patient_aadhar: '2345-6789-0123', age: 25, date: '2024-01-16', time: '11:00', doctor_id: '23456', hospital_id: 'H002', status: 'completed', token_no: 'T002' },
    { id: 'A003', patient_name: 'Bob Johnson', patient_aadhar: '3456-7890-1234', age: 45, date: '2024-01-17', time: '14:00', doctor_id: '34567', hospital_id: 'H003', status: 'pending', token_no: 'T003' }
  ]

  for (const appointment of appointments) {
    await sql`
      INSERT INTO appointments (id, patient_name, patient_aadhar, age, date, time, doctor_id, hospital_id, status, token_no)
      VALUES (${appointment.id}, ${appointment.patient_name}, ${appointment.patient_aadhar}, ${appointment.age}, ${appointment.date}, ${appointment.time}, ${appointment.doctor_id}, ${appointment.hospital_id}, ${appointment.status}, ${appointment.token_no})
      ON CONFLICT (id) DO NOTHING
    `
  }

  // Seed patient history
  const histories = [
    { id: 'H001', patient_id: 'P001', doctor_name: 'Dr. Arya Sharma', sickness: 'Fever', treatment: 'Rest and fluids', medicine: 'Paracetamol', scaning: 'blood_test.pdf', date: '2024-01-10 09:00:00' },
    { id: 'H002', patient_id: 'P002', doctor_name: 'Dr. Priya Menon', sickness: 'Headache', treatment: 'Medication', medicine: 'Ibuprofen', scaning: 'ct_scan.pdf', date: '2024-01-11 10:00:00' }
  ]

  for (const history of histories) {
    await sql`
      INSERT INTO patient_history (id, patient_id, doctor_name, sickness, treatment, medicine, scaning, date)
      VALUES (${history.id}, ${history.patient_id}, ${history.doctor_name}, ${history.sickness}, ${history.treatment}, ${history.medicine}, ${history.scaning}, ${history.date})
      ON CONFLICT (id) DO NOTHING
    `
  }

  // Seed staff
  const staff = [
    { id: 'S001', name: 'Alice Wilson', email: 'alice@example.com', phone: '+91-9876543211', role: 'Nurse', hospital_id: 'H001', department: 'General' },
    { id: 'S002', name: 'Charlie Brown', email: 'charlie@example.com', phone: '+91-9123456781', role: 'Technician', hospital_id: 'H002', department: 'Radiology' }
  ]

  for (const member of staff) {
    await sql`
      INSERT INTO staff (id, name, email, phone, role, hospital_id, department)
      VALUES (${member.id}, ${member.name}, ${member.email}, ${member.phone}, ${member.role}, ${member.hospital_id}, ${member.department})
      ON CONFLICT (id) DO NOTHING
    `
  }
}
