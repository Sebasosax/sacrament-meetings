'use client';

import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="max-w-sm mx-auto mt-16 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Sign In</h1>
      <p className="text-sm text-gray-500">
        Bishopric access only — manage the sacrament meeting schedule.
      </p>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            className="w-full border rounded px-3 py-2 pr-16"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button
        type="submit"
        aria-disabled={isPending}
        className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {errorMessage && (
        <p className="text-red-600 text-sm" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
