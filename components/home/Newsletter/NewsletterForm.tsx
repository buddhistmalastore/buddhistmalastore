"use client";

export default function NewsletterForm() {
  return (
    <form className="mx-auto mt-20 max-w-3xl">

      <div
        className="
        rounded-full
        border
        border-[#D4AF3730]
        bg-white/5
        backdrop-blur-xl
        p-2
        shadow-[0_0_40px_rgba(212,175,55,.08)]
      "
      >
        <div className="flex flex-col gap-4 md:flex-row">

          <input
            type="email"
            placeholder="Enter your email address"
            className="
            flex-1
            rounded-full
            bg-transparent
            px-8
            py-5
            text-white
            placeholder:text-[#999]
            outline-none
          "
          />

          <button
            className="
            rounded-full
            bg-[#D4AF37]
            px-10
            py-5
            font-semibold
            text-black
            transition-all
            duration-500
            hover:scale-105
            hover:shadow-[0_0_35px_rgba(212,175,55,.4)]
          "
          >
            Join The Journey
          </button>

        </div>
      </div>

    </form>
  );
}