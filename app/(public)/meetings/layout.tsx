import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="border-b border-gray-200 px-4 py-3">
        <Link href="/meetings" className="font-semibold text-lg">
          Sacrament Meeting Planner
        </Link>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
