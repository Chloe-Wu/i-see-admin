/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
  ],
  theme: {
    extend: {
      colors:{
        primary:'rgb(32, 38, 57)',
        highlight:'#fff',
        bgGray:'#fefefe',
      }
    },
  },
  plugins: [],
}

