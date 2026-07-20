import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

function getMostRecentSunday(): string {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day;
  const sunday = new Date(today.setDate(diff));
  return sunday.toISOString().split('T')[0];
}

export default function CurrentMeetingPage() {
  const sundayDate = getMostRecentSunday();
  const meetings = getMeetings();

  const current = meetings.find((m) => m.date === sundayDate);

  if (current) {
    redirect(`/meetings/${current.id}`);
  }

  const closest = meetings.reduce((prev, curr) => {
    const currDiff = Math.abs(new Date(curr.date).getTime() - new Date(sundayDate).getTime());
    const prevDiff = Math.abs(new Date(prev.date).getTime() - new Date(sundayDate).getTime());
    return currDiff < prevDiff ? curr : prev;
  });

  redirect(`/meetings/${closest.id}`);
}
