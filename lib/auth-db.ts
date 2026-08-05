import { sql } from './meetings-db';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function getUserByEmail(email: string): Promise<AuthUser | undefined> {
  const rows = await sql`SELECT id, name, email, password FROM users WHERE email = ${email}`;
  return rows[0] as AuthUser | undefined;
}
