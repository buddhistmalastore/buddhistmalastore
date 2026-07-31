"use client";

import AnnouncementBar from "./AnnouncementBar";
import HeaderLogo from "./HeaderLogo";
import DesktopNavigation from "./DesktopNavigation";
import HeaderActions from "./HeaderActions";
import MobileNavigation from "./MobileNavigation";

import Container from "@/components/ui/Container";

export default function Header() {
  return (
    <>
      <AnnouncementBar />

      <header
        className="
        sticky
        top-0
        z-[200]
        backdrop-blur-xl
        bg-black/40
        border-b
        border-[#D4AF3715]
      "
      >
        <Container>

          <div
            className="
            h-[88px]
            flex
            items-center
            justify-between
          "
          >

            <HeaderLogo />

            <DesktopNavigation />

            <div className="flex items-center gap-5">

              <HeaderActions />

              <MobileNavigation />

            </div>

          </div>

        </Container>
      </header>
    </>
  );
}