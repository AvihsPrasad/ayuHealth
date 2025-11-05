import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    // console.log(id)
    if (!id) {
        return NextResponse.json({ ok: false, error: "Missing 'id' parameter" }, { status: 400 });
    }
    try {
        const sql = neon(`${process.env.NEON_DB_URL}`);
        // const response = await sql`SELECT * FROM users where clerk_id = ${id}`;
        const response = await sql`SELECT h.* FROM docprofile d
                                    JOIN dochos dh ON d.id = dh.doctor_id
                                    JOIN hospitals h ON h.id = dh.hospital_id
                                    WHERE d.id = ${id}`;

        return Response.json({ data: response });
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}