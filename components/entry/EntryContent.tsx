"use client";

import { motion } from "framer-motion";

import EntryLogo from "./EntryLogo";
import EnterButton from "./EnterButton";
import LogoGlow from "./LogoGlow";
import EnterTransition from "./EnterTransition";

export default function EntryContent() {
  return (
    <section className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">

      <div className="relative flex flex-col items-center">

        {/* ========================= */}
        {/* TEXT BACKGROUND GLOW */}
        {/* ========================= */}

        <div
          className="absolute"
          style={{
            width: "900px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(0,0,0,.32) 0%, rgba(0,0,0,.14) 45%, transparent 75%)",
            filter: "blur(18px)",
            zIndex: 0,
          }}
        />

        {/* ========================= */}
        {/* DHARMA WHEEL */}
        {/* ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.6,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 5,
            duration: 1.8,
            ease: "easeOut",
          }}
          style={{ zIndex: 2 }}
        >
          <LogoGlow>
            <EntryLogo />
          </LogoGlow>
        </motion.div>

        {/* ========================= */}
        {/* TITLE */}
        {/* ========================= */}

        <motion.h1
          className="heading-font mt-10 text-center"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 6,
            duration: 1.2,
          }}
          style={{
            fontSize: "clamp(38px,4vw,68px)",
            lineHeight: 1.15,
            letterSpacing: "12px",
            color: "#FFF6D8",
            fontWeight: 700,
            textShadow: `
              0 3px 10px rgba(0,0,0,.70),
              0 0 18px rgba(255,220,120,.40),
              0 0 40px rgba(255,220,120,.20)
            `,
            zIndex: 2,
          }}
        >
          BUDDHIST
          <br />
          MALA STORE
        </motion.h1>

        {/* ========================= */}
        {/* SUBTITLE */}
        {/* ========================= */}

        <motion.p
          className="elegant-font mt-8 text-center"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 7,
            duration: 1,
          }}
          style={{
            color: "#F8E9C5",
            fontSize: "clamp(19px,2vw,30px)",
            letterSpacing: "4px",
            textShadow:
              "0 2px 8px rgba(0,0,0,.60)",
            zIndex: 2,
          }}
        >
          Handcrafted in Nepal
        </motion.p>

        {/* ========================= */}
        {/* TAGLINE */}
        {/* ========================= */}

        <motion.p
          className="elegant-font mt-4 text-center"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 8,
            duration: 1,
          }}
          style={{
            color: "#EAD7A5",
            fontSize: "clamp(16px,1.4vw,22px)",
            letterSpacing: "3px",
            textShadow:
              "0 2px 6px rgba(0,0,0,.55)",
            zIndex: 2,
          }}
        >
          Crafted with Devotion. Worn with Purpose.
        </motion.p>

        {/* ========================= */}
        {/* ENTER BUTTON */}
        {/* ========================= */}

        <motion.div
          className="mt-14 pointer-events-auto"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 9,
            duration: 1,
          }}
          style={{
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px rgba(255,220,120,.12)",
                "0 0 35px rgba(255,220,120,.30)",
                "0 0 10px rgba(255,220,120,.12)",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            style={{
              borderRadius: "999px",
            }}
          >
            <EnterTransition>
              <EnterButton />
            </EnterTransition>
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}