import { redirect } from 'next/navigation';
import { sql } from '@/lib/meetings-db';

function getThisWeekSunday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = (7 - day) % 7;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + diff);
  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  const sunday = getThisWeekSunday();
  const rows = await sql`SELECT id FROM meetings WHERE date = ${sunday}`;

  if (rows[0]) {
    redirect(`/meetings/${rows[0].id}`);
  }

  redirect('/meetings');
}
