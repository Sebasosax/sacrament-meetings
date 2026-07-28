'use client';

import Link from 'next/link';

export default function PublicMeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert">
      <h1>Something went wrong</h1>
      <p>{error.message || 'We ran into a problem loading this page.'}</p>
      <button onClick={() => reset()}>Try Again</button>
      <Link href="/meetings">Back to meetings</Link>
    </div>
  );
}
