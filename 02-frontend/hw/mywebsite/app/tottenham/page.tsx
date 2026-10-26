const favorites = [
  { label: "All-time favorite player", value: "Harry Kane" },
  { label: "Current favorite player", value: "Archie Gray" },
  { label: "Favorite match", value: "Europa League final vs. Man United" },
  { label: "Dream signing", value: "Cavan Sullivan" },
];

export default function Tottenham() {
  return (
    <main className="flex w-full flex-1 flex-col items-center px-8 py-20">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#f0dede]">
          Tottenham Hotspur
        </h1>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-[#f0dede]">
            How I became a fan
          </h2>
          <p className="text-lg leading-8 text-[#f0dede]">
            My story of becoming a Spurs fan starts with the 2022 World Cup.
            After my first season of playing soccer, I had gotten really
            interested in watching it too. I decided to choose a team by
            spinning a wheel, and I got sentenced to a life as a Spurs fan!
          </p>
        </section>

        <section className="flex w-full flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[#f0dede]">
            Favorites
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {favorites.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 rounded-xl border border-white/10 p-5 text-left ring-4 ring-white/5"
              >
                <p className="text-sm uppercase tracking-wide text-[#f0dede]/60">
                  {item.label}
                </p>
                <p className="text-lg font-semibold text-[#f0dede]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}