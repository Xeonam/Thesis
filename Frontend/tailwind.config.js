/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        navbarBgColor: '#512B81',
        importantText: '#FFDE91',
        customTextHighlight: '#9F549C',
        
      },
      height: {
        'screen-90': '91.5vh',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

