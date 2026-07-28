'use client';

import { useActionState } from 'react';
import { createMeeting, type MeetingFormState } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';

const initialState: MeetingFormState = {};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <div>
      <h1>Create Meeting</h1>
      <MeetingForm
        formAction={formAction}
        state={state}
        isPending={isPending}
        submitLabel="Create Meeting"
      />
    </div>
  );
}
