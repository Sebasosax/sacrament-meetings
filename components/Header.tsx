import NavLinks from './NavLinks';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b px-4 py-4 flex justify-between items-center">
      <div>
        <h1 className="font-bold text-lg">Springhill Ward</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>
      <NavLinks />
    </header>
  );
}
