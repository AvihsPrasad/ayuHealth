import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver

export async function POST(request: Request) {
    const body = await request.json();
    const { clerk_id, email } = body;
    console.log(clerk_id, email)
    if (!clerk_id || !email) {
        return NextResponse.json({ ok: false, error: "Missing 'name' or 'email' in request body" }, { status: 400 });
    }
    try {
        const sql = neon(`${process.env.NEON_DB_URL}`);
        const response = await sql`INSERT INTO appointments (patient_id, hospital_id, doctor_id, schedule, status) VALUES (${clerk_id}, ${email}) RETURNING *`;

        return Response.json({ data: response });
    } catch (error) {
        console.error("Error creating new user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
