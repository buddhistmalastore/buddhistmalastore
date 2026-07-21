export const ENV = {
  sky: {
    src: "/images/intro/sky.png",
    alt: "Sky",
    z: 0,

    scale: 1,
    x: 0,
    y: 0,

    objectPosition: "50% 50%",

    priority: true,
  },

  sun: {
    src: "/images/intro/sun-glow.png",
    alt: "Sun Glow",
    z: 1,

    scale: 1,
    x: 0,
    y: -15,

    objectPosition: "50% 42%",

    pulse: true,
  },

  far: {
  src: "/images/intro/mountains-far.png",
  alt: "Far Mountains",
  z: 2,

  scale: 1.02,
  x: 0,
  y: 10,
  objectPosition: "50% 53%",
},

middle: {
  src: "/images/intro/mountains-middle.png",
  alt: "Middle Mountains",
  z: 3,

  scale: 1.03,
  x: 0,
  y: 28,
  objectPosition: "50% 54%",
},

temple: {
  src: "/images/intro/temple.png",
  alt: "Temple",
  z: 4,

  scale: 0.98,
  x: 0,
  y: 35,
  objectPosition: "50% 52%",
},

front: {
  src: "/images/intro/mountains-front.png",
  alt: "Front Mountains",
  z: 5,

  scale: 1.05,
  x: 0,
  y: 90,
  objectPosition: "50% 58%",
},

mist: {
  src: "/images/intro/mist.png",
  alt: "Mist",
  z: 6,

  scale: 1.04,
  x: 0,
  y: 95,

  opacity: 0.35,

  drift: true,

  objectPosition: "50% 72%",
},
} as const;