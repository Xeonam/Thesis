/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        customNavbar: '#512B81',
        customNavbarText: '#FFDE91',
        
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

