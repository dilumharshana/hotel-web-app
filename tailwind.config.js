const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [flowbite.content()],
  theme: {
    extend: {}
  },
  plugins: [flowbite.plugin()]
};
