import { Howl } from "howler";

export const ambience = new Howl({
  src: ["/audio/ambience.mp3"],
  html5: true,
  loop: true,
  volume: 0.7,
});

export const templeBell = new Howl({
  src: ["/audio/temple-bell.mp3"],
  html5: true,
  volume: 0.7,
});