export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-amber-700">
            Buddhist Mala Store
          </h1>
          <p className="text-xs text-gray-500">
            Handmade in Nepal
          </p>
        </div>

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          <a href="/" className="font-medium hover:text-amber-700">
            Home
          </a>

          <a href="/shop" className="font-medium hover:text-amber-700">
            Shop
          </a>

          <a href="/about" className="font-medium hover:text-amber-700">
            About
          </a>

          <a href="/contact" className="font-medium hover:text-amber-700">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="rounded-full border border-amber-700 px-5 py-2 text-amber-700 hover:bg-amber-700 hover:text-white">
            Login
          </button>

          <button className="rounded-full bg-amber-700 px-5 py-2 text-white hover:bg-amber-800">
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}