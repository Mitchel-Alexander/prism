// Density -> colour ramps. Each is [low ... high] (sparse dust -> dense core).
// For opaque renders, stop[0] is the background colour so the dust fades into it.
// Tuned to the PRISM palette: ink #0a0e1a, indigo #3e507e, slate #9aa3b2,
// teal #1f7a70 / #4fcbb9, paper #f4f3ee.

export const palettes = {
  // signature: ink -> periwinkle/indigo -> slate -> near-white
  prism: [[10, 14, 26], [44, 58, 98], [120, 134, 176], [230, 235, 245]],
  // accent variant using PRISM's teals
  'prism-teal': [[10, 14, 26], [20, 70, 74], [79, 203, 185], [238, 243, 240]],
  // cooler, brighter blue (closer to a classic "ice")
  ice: [[6, 9, 18], [28, 54, 92], [120, 165, 215], [236, 244, 255]],
  // neutral greyscale, matching the original reference image
  mono: [[8, 8, 10], [70, 72, 80], [160, 162, 172], [245, 246, 250]],
  // warm, for contrast / occasional use
  ember: [[10, 5, 3], [92, 34, 18], [212, 112, 44], [255, 238, 212]],
};

// Named opaque backgrounds (override the lowest palette stop).
export const bgColors = {
  ink: [10, 14, 26], // --ink  #0a0e1a  (PRISM body bg)
  hero: [11, 14, 28], // hero    #0b0e1c
  black: [0, 0, 0], // pure black (like the reference)
};
