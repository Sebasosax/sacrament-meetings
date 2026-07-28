import { z } from 'zod';

const HymnSchema = z.object({
  number: z.coerce.number().int().min(1, 'Hymn number is required'),
  title: z.string().min(1, 'Hymn title is required'),
});

const SpeakerSchema = z.object({
  name: z.string().min(1, 'Speaker name is required'),
  topic: z.string().min(1, 'Topic is required'),
  type: z.enum(['speaker', 'musical-number']),
});

const WardBusinessSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special'], {
    message: 'Meeting type is required',
  }),
  presiding: z.string().min(1, 'Presiding is required'),
  conducting: z.string().min(1, 'Conducting is required'),
  announcements: z.array(z.string().min(1)).default([]),
  openingHymn: HymnSchema,
  openingPrayer: z.string().min(1, 'Opening prayer is required'),
  wardBusiness: z.array(WardBusinessSchema).default([]),
  stakeBusiness: z.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(SpeakerSchema).default([]),
  closingHymn: HymnSchema,
  closingPrayer: z.string().min(1, 'Closing prayer is required'),
});
