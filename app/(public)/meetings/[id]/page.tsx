import type { Metadata } from 'next';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';

const meetingTypeLabels: Record<string, string> = {
  testimony: 'Testimony Meeting',
  regular: 'Sacrament Meeting',
  stake: 'Stake Conference',
  general: 'General Conference',
  special: 'Special Meeting',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    return { title: 'Meeting Not Found' };
  }

  const label = meetingTypeLabels[meeting.meetingType] ?? 'Sacrament Meeting';
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    title: `${label} — ${formattedDate}`,
    description: `Details for the ${label.toLowerCase()} on ${formattedDate}, presided by ${meeting.presiding}.`,
  };
}

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  const meeting = await getMeetingById(numericId);
  if (!meeting) {
    notFound();
  }
  return <MeetingDetail meeting={meeting} />;
}
