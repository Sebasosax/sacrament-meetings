'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createMeetingRecord,
  updateMeetingRecord,
  deleteMeetingRecord,
} from './meetings-db';

// ---------- Zod schema ----------

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

// ---------- FormData -> raw object ----------
// Field-naming contract used by the create/edit forms:
// - scalar fields: same name as the schema key (date, presiding, conducting, ...)
// - hymns: <hymnKey>Number / <hymnKey>Title (e.g. openingHymnNumber, openingHymnTitle)
// - announcements: single textarea named "announcements", one item per line
// - wardBusiness: single textarea named "wardBusiness", one item per line
// - speakers: repeated inputs sharing the same name -> speakerName[], speakerTopic[], speakerType[]
// - stakeBusiness: checkbox named "stakeBusiness"

function formDataToMeetingInput(formData: FormData) {
  const speakerNames = formData.getAll('speakerName') as string[];
  const speakerTopics = formData.getAll('speakerTopic') as string[];
  const speakerTypes = formData.getAll('speakerType') as string[];

  const speakers = speakerNames
    .map((name, i) => ({
      name: name?.trim() ?? '',
      topic: speakerTopics[i]?.trim() ?? '',
      type: speakerTypes[i] ?? 'speaker',
    }))
    .filter((s) => s.name !== '');

  const announcements = ((formData.get('announcements') as string) ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const wardBusiness = ((formData.get('wardBusiness') as string) ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((description) => ({ description }));

  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements,
    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness,
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },
    speakers,
    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },
    closingPrayer: formData.get('closingPrayer'),
  };
}

// ---------- Server Action state type ----------

export type MeetingFormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

// ---------- Server Actions ----------

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const raw = formDataToMeetingInput(formData);
  const parsed = MeetingFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      message: 'Please fix the errors below and try again.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await createMeetingRecord(parsed.data);
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Something went wrong while saving the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const raw = formDataToMeetingInput(formData);
  const parsed = MeetingFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      message: 'Please fix the errors below and try again.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await updateMeetingRecord(id, parsed.data);
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('Something went wrong while saving the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await deleteMeetingRecord(id);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('Something went wrong while deleting the meeting. Please try again.');
  }

  revalidatePath('/meetings');
}
