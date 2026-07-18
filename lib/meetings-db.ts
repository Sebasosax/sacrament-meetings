import { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-06-07',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Miller',
    announcements: ['Ward campout next Saturday', 'Fast offerings due this week'],
    openingHymn: { number: 4, title: 'The Morning Breaks' },
    openingPrayer: 'Sister Johnson',
    wardBusiness: [{ description: 'Sustaining of new Primary teacher' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Brother Davis', topic: 'Faith in Christ', type: 'speaker' },
      { name: 'Sister Lee', topic: 'Service', type: 'speaker' },
    ],
    closingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    closingPrayer: 'Brother Smith',
  },
  {
    id: 2,
    date: '2026-06-14',
    meetingType: 'testimony',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Miller',
    announcements: ['Youth conference registration open'],
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Brother Garcia',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "'Tis Sweet to Sing" },
    speakers: [],
    closingHymn: { number: 219, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Perez',
  },
  {
    id: 3,
    date: '2026-06-21',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Miller',
    announcements: ["Father's Day activity after church"],
    openingHymn: { number: 92, title: 'Israel, Israel, God Is Calling' },
    openingPrayer: 'Sister White',
    wardBusiness: [{ description: 'New Sunday School president called' }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Bishop Anderson', topic: 'Fatherhood', type: 'speaker' },
      { name: 'Young Men Choir', topic: 'Musical Number', type: 'musical-number' },
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Nguyen',
  },
  {
    id: 4,
    date: '2026-06-28',
    meetingType: 'stake',
    presiding: 'President Roberts',
    conducting: 'President Roberts',
    announcements: ['Stake conference broadcast in cultural hall'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Elder Thompson',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 181, title: "O Thou, Before the World Began" },
    speakers: [
      { name: 'Elder Thompson', topic: 'Stake Direction', type: 'speaker' },
    ],
    closingHymn: { number: 249, title: 'Praise to the Man' },
    closingPrayer: 'Sister Kim',
  },
  {
    id: 5,
    date: '2026-07-05',
    meetingType: 'regular',
    presiding: 'Bishop Anderson',
    conducting: 'Brother Miller',
    announcements: ['Ward temple day this month'],
    openingHymn: { number: 249, title: 'Praise to the Man' },
    openingPrayer: 'Brother Alvarez',
    wardBusiness: [{ description: 'Baby blessing: Emma Rodriguez' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Sister Alvarez', topic: 'Gratitude', type: 'speaker' },
    ],
    closingHymn: { number: 96, title: 'Redeemer of Israel' },
    closingPrayer: 'Brother Kim',
  },
];

export function getMeetings(date?: string): SacramentMeeting[] {
  if (date) {
    return meetings.filter((m) => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((m) => m.id === id);
}