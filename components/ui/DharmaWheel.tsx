import Image from "next/image";

export default function DharmaWheel() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        right-[-180px]
        top-1/2
        z-0
        hidden
        -translate-y-1/2
        opacity-[0.035]
        lg:block
      "
    >
      <Image
        src="/images/dharma-wheel.png"
        alt=""
        width={520}
        height={520}
        priority={false}
        className="
          h-auto
          w-[420px]
          select-none
        "
      />
    </div>
  );
}