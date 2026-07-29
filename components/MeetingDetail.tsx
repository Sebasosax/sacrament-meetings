import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold capitalize">{meeting.meetingType} Meeting</h1>
            <p className="text-gray-600">{meeting.date}</p>
            <p className="text-sm text-gray-500">
              Presiding: {meeting.presiding} · Conducting: {meeting.conducting}
            </p>
          </div>
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </Link>
        </div>
      </header>
      {meeting.announcements && meeting.announcements.length > 0 && (
        <section>
          <h2 className="font-semibold mb-1">Announcements</h2>
          <ul className="list-disc list-inside">
            {meeting.announcements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h2 className="font-semibold mb-1">Opening Hymn</h2>
        <p>#{meeting.openingHymn.number} — {meeting.openingHymn.title}</p>
      </section>
      <section>
        <h2 className="font-semibold mb-1">Opening Prayer</h2>
        <p>{meeting.openingPrayer}</p>
      </section>
      {meeting.wardBusiness.length > 0 && (
        <section>
          <h2 className="font-semibold mb-1">Ward Business</h2>
          <ul className="list-disc list-inside">
            {meeting.wardBusiness.map((wb, i) => (
              <li key={i}>{wb.description}</li>
            ))}
          </ul>
        </section>
      )}
      {meeting.stakeBusiness && (
        <p className="text-sm italic text-gray-600">Includes stake business</p>
      )}
      <section>
        <h2 className="font-semibold mb-1">Sacrament Hymn</h2>
        <p>#{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}</p>
      </section>
      {meeting.speakers.length > 0 && (
        <section>
          <h2 className="font-semibold mb-1">Speakers & Musical Numbers</h2>
          <ul className="list-disc list-inside">
            {meeting.speakers.map((s, i) => (
              <li key={i}>
                {s.name} — {s.topic} ({s.type === 'musical-number' ? 'Musical Number' : 'Speaker'})
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h2 className="font-semibold mb-1">Closing Hymn</h2>
        <p>#{meeting.closingHymn.number} — {meeting.closingHymn.title}</p>
      </section>
      <section>
        <h2 className="font-semibold mb-1">Closing Prayer</h2>
        <p>{meeting.closingPrayer}</p>
      </section>
    </div>
  );
}
