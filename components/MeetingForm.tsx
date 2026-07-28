'use client';

import { useState } from 'react';
import type { MeetingFormState } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

type SpeakerRow = {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
};

export default function MeetingForm({
  formAction,
  state,
  isPending,
  defaultMeeting,
  submitLabel,
}: {
  formAction: (formData: FormData) => void;
  state: MeetingFormState;
  isPending: boolean;
  defaultMeeting?: SacramentMeeting;
  submitLabel: string;
}) {
  const [speakers, setSpeakers] = useState<SpeakerRow[]>(
    defaultMeeting && defaultMeeting.speakers.length > 0
      ? defaultMeeting.speakers
      : [{ name: '', topic: '', type: 'speaker' }]
  );

  const errors = state.errors ?? {};

  function addSpeaker() {
    setSpeakers((prev) => [...prev, { name: '', topic: '', type: 'speaker' }]);
  }

  function removeSpeaker(index: number) {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSpeaker(index: number, field: keyof SpeakerRow, value: string) {
    setSpeakers((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  return (
    <form action={formAction} noValidate>
      {state.message && (
        <p role="alert" aria-live="polite">
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={defaultMeeting?.date ?? ''}
          aria-describedby="date-error"
        />
        <div id="date-error" aria-live="polite">
          {errors.date?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="meetingType">Meeting Type</label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={defaultMeeting?.meetingType ?? 'regular'}
          aria-describedby="meetingType-error"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div id="meetingType-error" aria-live="polite">
          {errors.meetingType?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="presiding">Presiding</label>
        <input
          type="text"
          id="presiding"
          name="presiding"
          defaultValue={defaultMeeting?.presiding ?? ''}
          aria-describedby="presiding-error"
        />
        <div id="presiding-error" aria-live="polite">
          {errors.presiding?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="conducting">Conducting</label>
        <input
          type="text"
          id="conducting"
          name="conducting"
          defaultValue={defaultMeeting?.conducting ?? ''}
          aria-describedby="conducting-error"
        />
        <div id="conducting-error" aria-live="polite">
          {errors.conducting?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="announcements">Announcements (one per line)</label>
        <textarea
          id="announcements"
          name="announcements"
          defaultValue={(defaultMeeting?.announcements ?? []).join('\n')}
          aria-describedby="announcements-error"
        />
        <div id="announcements-error" aria-live="polite">
          {errors.announcements?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <fieldset>
        <legend>Opening Hymn</legend>
        <label htmlFor="openingHymnNumber">Number</label>
        <input
          type="number"
          id="openingHymnNumber"
          name="openingHymnNumber"
          defaultValue={defaultMeeting?.openingHymn.number ?? ''}
          aria-describedby="openingHymn-error"
        />
        <label htmlFor="openingHymnTitle">Title</label>
        <input
          type="text"
          id="openingHymnTitle"
          name="openingHymnTitle"
          defaultValue={defaultMeeting?.openingHymn.title ?? ''}
          aria-describedby="openingHymn-error"
        />
        <div id="openingHymn-error" aria-live="polite">
          {errors.openingHymn?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </fieldset>

      <div>
        <label htmlFor="openingPrayer">Opening Prayer</label>
        <input
          type="text"
          id="openingPrayer"
          name="openingPrayer"
          defaultValue={defaultMeeting?.openingPrayer ?? ''}
          aria-describedby="openingPrayer-error"
        />
        <div id="openingPrayer-error" aria-live="polite">
          {errors.openingPrayer?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="wardBusiness">Ward Business (one per line)</label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          defaultValue={(defaultMeeting?.wardBusiness ?? [])
            .map((item) => item.description)
            .join('\n')}
          aria-describedby="wardBusiness-error"
        />
        <div id="wardBusiness-error" aria-live="polite">
          {errors.wardBusiness?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="stakeBusiness">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            defaultChecked={defaultMeeting?.stakeBusiness ?? false}
            aria-describedby="stakeBusiness-error"
          />
          Stake Business
        </label>
        <div id="stakeBusiness-error" aria-live="polite">
          {errors.stakeBusiness?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <fieldset>
        <legend>Sacrament Hymn</legend>
        <label htmlFor="sacramentHymnNumber">Number</label>
        <input
          type="number"
          id="sacramentHymnNumber"
          name="sacramentHymnNumber"
          defaultValue={defaultMeeting?.sacramentHymn.number ?? ''}
          aria-describedby="sacramentHymn-error"
        />
        <label htmlFor="sacramentHymnTitle">Title</label>
        <input
          type="text"
          id="sacramentHymnTitle"
          name="sacramentHymnTitle"
          defaultValue={defaultMeeting?.sacramentHymn.title ?? ''}
          aria-describedby="sacramentHymn-error"
        />
        <div id="sacramentHymn-error" aria-live="polite">
          {errors.sacramentHymn?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </fieldset>

      <fieldset>
        <legend>Speakers</legend>
        {speakers.map((speaker, index) => (
          <div key={index}>
            <label htmlFor={`speakerName-${index}`}>Name</label>
            <input
              type="text"
              id={`speakerName-${index}`}
              name="speakerName"
              value={speaker.name}
              onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
              aria-describedby="speakers-error"
            />
            <label htmlFor={`speakerTopic-${index}`}>Topic</label>
            <input
              type="text"
              id={`speakerTopic-${index}`}
              name="speakerTopic"
              value={speaker.topic}
              onChange={(e) => updateSpeaker(index, 'topic', e.target.value)}
              aria-describedby="speakers-error"
            />
            <label htmlFor={`speakerType-${index}`}>Type</label>
            <select
              id={`speakerType-${index}`}
              name="speakerType"
              value={speaker.type}
              onChange={(e) => updateSpeaker(index, 'type', e.target.value)}
              aria-describedby="speakers-error"
            >
              <option value="speaker">Speaker</option>
              <option value="musical-number">Musical Number</option>
            </select>
            <button
              type="button"
              onClick={() => removeSpeaker(index)}
              disabled={speakers.length === 1}
            >
              Remove speaker
            </button>
          </div>
        ))}
        <button type="button" onClick={addSpeaker}>
          Add speaker
        </button>
        <div id="speakers-error" aria-live="polite">
          {errors.speakers?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </fieldset>

      <fieldset>
        <legend>Closing Hymn</legend>
        <label htmlFor="closingHymnNumber">Number</label>
        <input
          type="number"
          id="closingHymnNumber"
          name="closingHymnNumber"
          defaultValue={defaultMeeting?.closingHymn.number ?? ''}
          aria-describedby="closingHymn-error"
        />
        <label htmlFor="closingHymnTitle">Title</label>
        <input
          type="text"
          id="closingHymnTitle"
          name="closingHymnTitle"
          defaultValue={defaultMeeting?.closingHymn.title ?? ''}
          aria-describedby="closingHymn-error"
        />
        <div id="closingHymn-error" aria-live="polite">
          {errors.closingHymn?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </fieldset>

      <div>
        <label htmlFor="closingPrayer">Closing Prayer</label>
        <input
          type="text"
          id="closingPrayer"
          name="closingPrayer"
          defaultValue={defaultMeeting?.closingPrayer ?? ''}
          aria-describedby="closingPrayer-error"
        />
        <div id="closingPrayer-error" aria-live="polite">
          {errors.closingPrayer?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
