interface Props {
  children: React.ReactNode;
}

export default function Container({
  children,
}: Props) {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[1500px]
        px-5
        lg:px-8
      "
    >
      {children}
    </div>
  );
}