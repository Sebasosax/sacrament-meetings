import Image from 'next/image';
import NavLinks from './NavLinks';
import { auth, signOut } from '@/auth';

export default async function Header() {
  const session = await auth();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Image
          src="/church-icon.svg"
          alt="Springhill Ward icon"
          width={40}
          height={40}
        />
        <div>
          <h1 className="font-bold text-lg">Springhill Ward</h1>
          <p className="text-sm text-gray-500">{today}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NavLinks />
        {session?.user ? (
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button type="submit" className="text-sm underline">
              Sign Out
            </button>
          </form>
        ) : (
          <a href="/login" className="text-sm underline">
            Sign In
          </a>
        )}
      </div>
    </header>
  );
}
