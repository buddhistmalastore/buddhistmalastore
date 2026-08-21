interface Props {
  subtitle?: string;
  title: string;
  center?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  center = false,
}: Props) {
  return (
    <div
      className={
        center
          ? "text-center"
          : ""
      }
    >
      {subtitle && (
        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[3px]
            text-[#C79B2A]
          "
        >
          {subtitle}
        </span>
      )}

      <h2
        className="
          mt-2
          text-3xl
          font-bold
          text-[#1A1A1A]
          lg:text-4xl
        "
      >
        {title}
      </h2>
    </div>
  );
}