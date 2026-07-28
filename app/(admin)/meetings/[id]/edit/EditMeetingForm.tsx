'use client';

import { useActionState } from 'react';
import { updateMeeting, type MeetingFormState } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';
import type { SacramentMeeting } from '@/lib/types';

const initialState: MeetingFormState = {};

export default function EditMeetingForm({ meeting }: { meeting: SacramentMeeting }) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);

  return (
    <MeetingForm
      formAction={formAction}
      state={state}
      isPending={isPending}
      defaultMeeting={meeting}
      submitLabel="Save Changes"
    />
  );
}
