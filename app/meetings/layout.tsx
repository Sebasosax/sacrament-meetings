import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <nav className="flex gap-4 mb-6 border-b pb-3">
        <Link href="/meetings" className="text-blue-600 hover:underline">
          All Meetings
        </Link>
        <Link href="/meetings/current" className="text-blue-600 hover:underline">
          Current Meeting
        </Link>
      </nav>
      {children}
    </div>
  );
}
