"use client";

import Bird from "./Bird";

export default function BirdFlock() {
  return (
    <>
      <Bird
        image="bird-01.png"
        top="10%"
        size={42}
        duration={42}
      />

      <Bird
        image="bird-02.png"
        top="13%"
        size={36}
        duration={36}
        delay={4}
      />

      <Bird
        image="bird-03.png"
        top="16%"
        size={34}
        duration={39}
        delay={8}
      />

      <Bird
        image="bird-04.png"
        top="14%"
        size={40}
        duration={44}
        delay={11}
      />

      <Bird
        image="bird-05.png"
        top="18%"
        size={34}
        duration={34}
        delay={6}
      />

      <Bird
        image="bird-06.png"
        top="15%"
        size={38}
        duration={46}
        delay={15}
      />

      <Bird
        image="bird-07.png"
        top="12%"
        size={20}
        duration={52}
        delay={19}
      />

      <Bird
        image="bird-08.png"
        top="17%"
        size={52}
        duration={48}
        delay={23}
      />
    </>
  );
}