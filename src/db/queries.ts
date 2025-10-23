import sql from './index'

// User queries
export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `
  return result[0]
}

export async function getUserById(userId: string) {
  const result = await sql`
    SELECT * FROM users WHERE user_id = ${userId}
  `
  return result[0]
}

// Hospital queries
export async function getHospitals() {
  return await sql`
    SELECT * FROM hospitals ORDER BY name
  `
}

export async function getHospitalById(id: string) {
  const result = await sql`
    SELECT * FROM hospitals WHERE id = ${id}
  `
  return result[0]
}

// Patient queries
export async function getPatients() {
  return await sql`
    SELECT * FROM patients ORDER BY name
  `
}

export async function getPatientById(id: string) {
  const result = await sql`
    SELECT * FROM patients WHERE id = ${id}
  `
  return result[0]
}

export async function createPatient(patient: {
  id: string
  name: string
  aadhar: string
  phone?: string
  email?: string
  age?: number
  gender?: string
  dob?: string
  address?: string
}) {
  return await sql`
    INSERT INTO patients (id, name, aadhar, phone, email, age, gender, dob, address)
    VALUES (${patient.id}, ${patient.name}, ${patient.aadhar}, ${patient.phone}, ${patient.email}, ${patient.age}, ${patient.gender}, ${patient.dob}, ${patient.address})
    RETURNING *
  `
}

// Appointment queries
export async function getAppointments() {
  return await sql`
    SELECT * FROM appointments ORDER BY date DESC, time ASC
  `
}

export async function getAppointmentsByPatientName(patientName: string) {
  return await sql`
    SELECT * FROM appointments WHERE patient_name = ${patientName} ORDER BY date DESC
  `
}

export async function createAppointment(appointment: {
  id: string
  patient_name: string
  patient_aadhar?: string
  age?: number
  date: string
  time: string
  doctor_id: string
  hospital_id: string
  status?: string
  token_no?: string
}) {
  return await sql`
    INSERT INTO appointments (id, patient_name, patient_aadhar, age, date, time, doctor_id, hospital_id, status, token_no)
    VALUES (${appointment.id}, ${appointment.patient_name}, ${appointment.patient_aadhar}, ${appointment.age}, ${appointment.date}, ${appointment.time}, ${appointment.doctor_id}, ${appointment.hospital_id}, ${appointment.status || 'pending'}, ${appointment.token_no})
    RETURNING *
  `
}

// Patient History queries
export async function getPatientHistory(patientId: string) {
  return await sql`
    SELECT * FROM patient_history WHERE patient_id = ${patientId} ORDER BY date DESC
  `
}

export async function createPatientHistory(history: {
  id: string
  patient_id: string
  doctor_name: string
  sickness?: string
  treatment?: string
  medicine?: string
  scaning?: string
}) {
  return await sql`
    INSERT INTO patient_history (id, patient_id, doctor_name, sickness, treatment, medicine, scaning)
    VALUES (${history.id}, ${history.patient_id}, ${history.doctor_name}, ${history.sickness}, ${history.treatment}, ${history.medicine}, ${history.scaning})
    RETURNING *
  `
}

// Staff queries
export async function getStaff() {
  return await sql`
    SELECT * FROM staff ORDER BY name
  `
}

export async function getStaffByHospital(hospitalId: string) {
  return await sql`
    SELECT * FROM staff WHERE hospital_id = ${hospitalId} ORDER BY name
  `
}
