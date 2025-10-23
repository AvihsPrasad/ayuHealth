// import { NextRequest, NextResponse } from 'next/server';

import { neon } from '@neondatabase/serverless'; // Example using Neon serverless driver

export async function GET(request: Request) {
    try {
      const sql = neon(`${process.env.NEON_DB_URL}`);
      const response = await sql`SELECT * FROM dummy`;
  
      return Response.json({ data: response });
    } catch (error) {
      console.error("Error fetching drivers:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }