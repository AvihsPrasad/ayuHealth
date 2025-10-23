import { neon } from '@neondatabase/serverless';

if (!process.env.NEON_DB_URL) {
    throw new Error('NEON_DATABASE_URL must be a Neon postgres connection string')
}
const sql = neon(`${process.env.NEON_DB_URL}`);

// export const getDBVersion = async() => {
//     console.log(process.env.NEON_DB_URL)
//     // const sql = neon(process.env.NEON_DATABASE_URL);
//     const response = await sql`SELECT version()`;
//     return { version: response[0].version }
// }

// export const getCategories = async() => {
//     const response = await sql`SELECT * from category`;
//     return new Response(JSON.stringify({ data: response }), {
//         status: 201,
//       });
// }

export async function POST(request: Request) {
    try {
        const response = await sql`SELECT * from category`;
        console.log("Categories fetched:", JSON.stringify(response));
        let resp = new Response(JSON.stringify({ data: response }), {
            status: 201,
          })
        return resp;
        
    } catch (error) {
        console.error("Error creating user:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}