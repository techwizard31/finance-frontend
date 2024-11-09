/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjusted for typical React src folder structure
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#160f4a',
        accent: '#04942C',
      },
      fontFamily: {
        playfair: ['Playfair', 'serif'],
        oxanium: ['Oxanium', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'radial-bottom-corners': `
          radial-gradient(circle at bottom left, #04942C 5%, transparent 50%),
          radial-gradient(circle at bottom right, #160f4a 4%, transparent 50%)
        `,
        'radial-topbottom-corners': `
          radial-gradient(circle at top left, #04942C 4%, transparent 30%),
          radial-gradient(circle at bottom right, #160f4a 4%, transparent 30%)
        `
      },
      boxShadow: {
        'inset-custom': 'inset -4px -4px 0 rgba(0, 0, 0, 0.25)',
        'inset-box': 'inset -3px -3px 0 rgba(0, 0, 0, 0.5)',
      },
      screens: {
        sm_mobile: {
          max: "450px",
        },
        tablet: {
          min: "450px", max: "580px",
        }
      }
    },
  },
  plugins: [],
};
