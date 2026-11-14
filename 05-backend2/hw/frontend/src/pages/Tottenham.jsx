const favorites = [
  { label: "All-time favorite player", value: "Harry Kane" },
  { label: "Current favorite player", value: "Archie Gray" },
  { label: "Favorite match", value: "Europa League final vs. Man United" },
  { label: "Dream signing", value: "Cavan Sullivan" },
];

export default function Tottenham() {
  return (
    <main className="w-full flex-1 px-6 py-16 sm:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <h1 className="text-4xl font-bold tracking-tight">Tottenham Hotspur</h1>

        <section className="flex max-w-xl flex-col gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">How I became a fan</h2>
          <p className="text-lg leading-8">
            My story of becoming a Spurs fan starts with the 2022 World Cup. After my first
            season of playing soccer, I had gotten really interested in watching it too. I
            decided to choose a team by spinning a wheel, and I got sentenced to a life as a
            Spurs fan!
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Favorites</h2>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {favorites.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-t border-line py-4">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-lg font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
