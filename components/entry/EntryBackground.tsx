export default function EntryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gold Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17] via-transparent to-black/30" />
    </div>
  );
}