import { neon } from '@neondatabase/serverless';
import {
  SacramentMeeting,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
  MeetingInput,
} from './types';

export const sql = neon(process.env.DATABASE_URL!);

interface MeetingRow {
  id: number;
  date: string | Date;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[] | null;
  closing_hymn: Hymn;
  closing_prayer: string;
}

function toDateString(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  return value;
}

function mapRowToMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: toDateString(row.date),
    meetingType: row.meeting_type as SacramentMeeting['meetingType'],
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
  const rows = date
    ? await sql`SELECT * FROM meetings WHERE date = ${date} ORDER BY date DESC`
    : await sql`SELECT * FROM meetings ORDER BY date DESC`;

  return (rows as MeetingRow[]).map(mapRowToMeeting);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  const rows = await sql`SELECT * FROM meetings WHERE id = ${id}`;
  return rows[0] ? mapRowToMeeting(rows[0] as MeetingRow) : undefined;
}

export async function getMeetingsPaginated({
  query,
  page = 1,
  pageSize = 5,
}: {
  query?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ meetings: SacramentMeeting[]; total: number }> {
  const search = query ? `%${query}%` : null;
  const offset = (page - 1) * pageSize;

  const rows = await sql`
    SELECT * FROM meetings
    WHERE (
      ${search}::text IS NULL
      OR presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR speakers::text ILIKE ${search}
    )
    ORDER BY date DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  const countResult = await sql`
    SELECT COUNT(*)::int AS count FROM meetings
    WHERE (
      ${search}::text IS NULL
      OR presiding ILIKE ${search}
      OR conducting ILIKE ${search}
      OR meeting_type ILIKE ${search}
      OR speakers::text ILIKE ${search}
    )
  `;

  return {
    meetings: (rows as MeetingRow[]).map(mapRowToMeeting),
    total: Number(countResult[0].count),
  };
}

// ---------- Mutations ----------

export async function createMeetingRecord(data: MeetingInput): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    ) VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)},
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)},
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING *
  `;

  return mapRowToMeeting(rows[0] as MeetingRow);
}

export async function updateMeetingRecord(
  id: number,
  data: MeetingInput
): Promise<SacramentMeeting> {
  const rows = await sql`
    UPDATE meetings SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements},
      opening_hymn = ${JSON.stringify(data.openingHymn)},
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)},
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)},
      speakers = ${JSON.stringify(data.speakers)},
      closing_hymn = ${JSON.stringify(data.closingHymn)},
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING *
  `;

  return mapRowToMeeting(rows[0] as MeetingRow);
}

export async function deleteMeetingRecord(id: number): Promise<void> {
  await sql`DELETE FROM meetings WHERE id = ${id}`;
}
