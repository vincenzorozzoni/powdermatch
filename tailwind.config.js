/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D47A1',
        accent: '#FF6B35',
        dark: '#1A1A1A',
        light: '#F8F9FA',
        gray: '#6C757D',
        border: '#DEE2E6',
      },
    },
  },
  plugins: [],
}
