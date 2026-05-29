/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        width: {
          '90': '90%',
        },
        keyframes: {
          'fun-shake': {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 50%, 90%': { transform: 'translateX(-4px)' },
            '30%, 70%': { transform: 'translateX(4px)' },
          },
          'fun-fade-in': {
            '0%': { opacity: '0', transform: 'scale(0.9)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          'fun-bounce-in': {
            '0%': { opacity: '0', transform: 'scale(0.3)' },
            '50%': { transform: 'scale(1.1)' },
            '70%': { transform: 'scale(0.9)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
        },
        animation: {
          'fun-shake': 'fun-shake 0.5s ease-in-out',
          'fun-fade-in': 'fun-fade-in 0.5s ease-out',
          'fun-bounce-in': 'fun-bounce-in 0.5s ease-out',
        },
      },
    },
    plugins: [],
  }