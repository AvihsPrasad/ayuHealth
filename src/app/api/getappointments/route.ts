import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctor_id");
    const hospitalId = searchParams.get("hospital_id");
    console.log(doctorId, hospitalId)
    if (!doctorId || !hospitalId) {
        return NextResponse.json({ ok: false, error: "Missing 'doctor_id' or 'hospital_id' parameter" }, { status: 400 });
    }
    try {
        const sql = neon(`${process.env.NEON_DB_URL}`);
        const response = await sql`SELECT a.*, p.name as patient_full_name, p.phone, p.email, p.gender, p.dob, p.address FROM appointments a JOIN patients p ON a.patient_aadhar = p.aadhar WHERE a.doctor_id = ${doctorId} AND a.hospital_id = ${hospitalId}`;

        return Response.json({ data: response });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
