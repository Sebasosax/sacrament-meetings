'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import {
  createMeetingRecord,
  updateMeetingRecord,
  deleteMeetingRecord,
} from './meetings-db';
import { MeetingFormSchema } from './meeting-schema';

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

export type MeetingFormState = {
  message?: string;
  errors?: Record<string, string[]>;
};

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
  revalidatePath(`/meetings/${id}`);
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
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/meetings',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong. Please try again.';
      }
    }
    throw error;
  }
}
