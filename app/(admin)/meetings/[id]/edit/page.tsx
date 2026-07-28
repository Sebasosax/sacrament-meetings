import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Meeting</h1>
      <p>Editing meeting for {meeting.date} — form arrives in the next step.</p>
    </div>
  );
}
