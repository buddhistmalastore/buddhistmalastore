export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50">
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-amber-700">
          Buddhist Mala Store
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-700">
          Authentic Handmade Buddhist Malas, Gemstone Bracelets,
          Singing Bowls and Himalayan Handicrafts from Nepal.
        </p>

        <button className="mt-10 rounded-full bg-amber-700 px-8 py-4 text-white transition hover:bg-amber-800">
          Shop Now
        </button>
      </section>
    </main>
  );
}