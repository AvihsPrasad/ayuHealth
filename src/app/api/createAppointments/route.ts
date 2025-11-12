import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver
import { toPostgreSQLTimestamp } from '@/lib/utils';

export async function POST(request: Request) {
    const body = await request.json();
    const { p_id, h_id,d_id,date,time,type } = body;
    const scheduledAt = toPostgreSQLTimestamp({ date, time });
    console.log(scheduledAt)
    if (!p_id || !h_id || !d_id) {
        return NextResponse.json({ ok: false, error: "Missing 'name' or 'email' in request body" }, { status: 400 });
    }
    try {
        const sql = neon(`${process.env.NEON_DB_URL}`);
        const response = await sql`INSERT INTO appointments (patient_id, hospital_id, doctor_id, schedule, status, type) VALUES (${p_id},${h_id},${d_id},${scheduledAt},${"pending"},${type}) RETURNING *`;

        return Response.json({ data: response });
    } catch (error) {
        console.error("Error creating new user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
