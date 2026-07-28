import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingButton({ id }: { id: number }) {
  const deleteMeetingWithId = deleteMeeting.bind(null, id);

  return (
    <form action={deleteMeetingWithId}>
      <button type="submit">Delete Meeting</button>
    </form>
  );
}
