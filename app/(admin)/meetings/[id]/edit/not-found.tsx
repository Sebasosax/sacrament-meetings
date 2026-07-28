import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div role="alert">
      <h1>Meeting not found</h1>
      <p>We couldn&apos;t find the meeting you&apos;re trying to edit. It may have been deleted.</p>
      <Link href="/meetings">Back to meetings</Link>
    </div>
  );
}
