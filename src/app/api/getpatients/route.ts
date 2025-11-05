import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url);
    // const doctorId = searchParams.get("doctor_id");
    // const hospitalId = searchParams.get("hospital_id");
    // console.log(doctorId, hospitalId)
    // if (!doctorId || !hospitalId) {
    //     return NextResponse.json({ ok: false, error: "Missing 'doctor_id' or 'hospital_id' parameter" }, { status: 400 });
    // }
    try {
        const sql = neon(`${process.env.NEON_DB_URL}`);
        const response = await sql`SELECT * FROM patient`;

        return Response.json({ data: response });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
