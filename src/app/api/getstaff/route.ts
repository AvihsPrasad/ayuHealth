import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const hospitalId = searchParams.get("hospital_id");
    console.log(hospitalId)
    if (!hospitalId) {
        return NextResponse.json({ ok: false, error: "Missing 'hospital_id' parameter" }, { status: 400 });
    }
    try {
        const sql = neon(`${process.env.NEON_DB_URL}`);
        const response = await sql`SELECT * FROM users WHERE hospital_id = ${hospitalId}`;

        return Response.json({ data: response });
    } catch (error) {
        console.error("Error fetching staff:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
