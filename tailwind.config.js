/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {

    colors: {
      'primary': '#54AF9A',
      'primary-light': '#E0F2F1', // lighter variant
      'primary-dark': '#3A8B7D',  // darker variant
      'bg-primary': '#F0F0F0',
      'bg-secondary': '#FFFFFF'
    },
    fontFamily: {
      'primary': 'Judson',
    },
    extend: {
      backgroundImage: {
        'img': "url('/bg.png')",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('@tailwindcss/forms'),
  ],
}