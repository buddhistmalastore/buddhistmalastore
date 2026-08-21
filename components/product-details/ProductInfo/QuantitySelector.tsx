"use client";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  value,
  onChange,
}: Props) {
  return (
    <div
      className="
        flex
        h-[52px]
        items-center
        justify-between
        rounded-xl
        border
        border-[#DDD]
        bg-white
        px-4
      "
    >
      <button
        onClick={() =>
          onChange(Math.max(1, value - 1))
        }
        className="text-xl font-semibold"
      >
        −
      </button>

      <span className="text-lg font-semibold">
        {value}
      </span>

      <button
        onClick={() =>
          onChange(value + 1)
        }
        className="text-xl font-semibold"
      >
        +
      </button>
    </div>
  );
}