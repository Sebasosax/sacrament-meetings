import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetingsPaginated } from '@/lib/meetings-db';

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 5;

  const { meetings, total } = await getMeetingsPaginated({
    query,
    page: currentPage,
    pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Sacrament Meetings</h1>
      <MeetingSearch />
      <div className="space-y-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
        {meetings.length === 0 && (
          <p className="text-gray-500">No meetings found.</p>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
