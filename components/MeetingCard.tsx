import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{meeting.date}</p>
          <p className="text-sm text-gray-600 capitalize">{meeting.meetingType} meeting</p>
        </div>
        <span className="text-sm text-gray-500">
          Presiding: {meeting.presiding}
        </span>
      </div>
    </Link>
  );
}