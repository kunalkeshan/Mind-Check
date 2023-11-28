/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F3F6EF',
        secondary: '#FFC8C8',
        secondaryDark: '#F1B5AC',
        tertiary: '#CFF0F9',
        textPrimary: '#0B1E5B',
        textSecondary: '#1f69fa'
      },
      fontFamily: {
        heading: 'Overlock',
        body: 'Kulim Park',
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@headlessui/tailwindcss')],
}

