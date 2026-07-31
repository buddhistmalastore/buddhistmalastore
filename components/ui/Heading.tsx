interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function Heading({
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      {subtitle && (
        <p
          className="
          mb-3
          uppercase
          tracking-[5px]
          text-[#D4AF37]
          text-sm
        "
        >
          {subtitle}
        </p>
      )}

      <h2
        className="
        heading-font
        text-4xl
        md:text-5xl
        lg:text-6xl
        text-[#F7F3EC]
        font-semibold
      "
      >
        {title}
      </h2>
    </div>
  );
}