/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        playfair: ['Playfair', 'serif'], // Define the font family
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
        `,
        'leftbull':"url('/leftbull.png')",
        'rightbull':"url('/rightbull.png')",
        'landing':"url('/landing.png')",
        'rounds':"url('/records.png')"
      },
      boxShadow: {
        'inset-custom': 'inset -4px -4px 0 rgba(0, 0, 0, 0.25)',
        'inset-box': 'inset -3px -3px 0 rgba(0, 0, 0, 0.5)',
      },
      screens:{
        sm_mobile:{
          max:"450px"
        },
        tablet:{
          min: '450px', max: '580px'
        }
      }
    },
  },
  plugins: [],
};


