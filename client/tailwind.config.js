/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "night"], // Enable light and dark themes
  },
};

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         }
//       },
//       animation: {
//         'fade-in': 'fadeIn 1s ease-out',
//       }
//     },
//   },
//   plugins: [require('daisyui')],
//   daisyui: {
//     themes: ["light", "night"], // Enable light and dark themes
//   },
// }
