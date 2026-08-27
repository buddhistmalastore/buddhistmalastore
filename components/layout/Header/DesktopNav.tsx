"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import { FiChevronDown } from "react-icons/fi";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-10">
      {navigation.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              group
              relative
              flex
              items-center
              gap-1
              py-2
              text-[15px]
              font-medium
              transition-all
              duration-300
              ${
                active
                  ? "text-[#C79B2A] font-semibold"
                  : "text-[#1A1A1A] hover:text-[#C79B2A]"
              }
            `}
          >
            {item.title}

            {item.title === "Shop" && (
              <FiChevronDown
                className="
                  text-sm
                  transition-transform
                  duration-300
                  group-hover:rotate-180
                "
              />
            )}

            <span
              className={`
                absolute
                left-0
                -bottom-1
                h-[2px]
                bg-[#C79B2A]
                transition-all
                duration-300
                ${
                  active
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
}