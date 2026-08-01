"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-10">
      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              relative
              text-[15px]
              font-medium
              transition-all
              duration-300

              ${
                active
                  ? "text-[#C79B2A]"
                  : "text-[#2B251F] hover:text-[#C79B2A]"
              }
            `}
          >
            {item.title}

            <span
              className={`
                absolute
                -bottom-2
                left-0
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