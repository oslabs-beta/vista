/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // FIXME: fades but after it gets to 0% opacity it immediately goes back to 100% and stays there. State issue?
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0%' },
        },
      },
      colors: {
        primary: '#415A77',
        secondary: '#778DA9',
        background: '#E0E1DD',
        warning: '#E63946',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
}
