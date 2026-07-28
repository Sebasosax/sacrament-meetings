import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from './EditMeetingForm';
import DeleteMeetingButton from './DeleteMeetingButton';

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
      <EditMeetingForm meeting={meeting} />
      <DeleteMeetingButton id={meeting.id} />
    </div>
  );
}
