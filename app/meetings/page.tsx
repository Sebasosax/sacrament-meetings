import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch('http://localhost:3000/api/meetings', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Sacrament Meetings</h1>
      <div className="space-y-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
