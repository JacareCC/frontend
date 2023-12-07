import type { Config } from 'tailwindcss'
// import gator from "./public/gator-searching.png"

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jgreen: 'var(--jgreen)',
        jyellow: 'var(--jyellow)',
        jgreend: 'var(--jgreend)',
        bronze: '#cd7f32',
        silver: '#c0c0c0',
        gold: '#ffd700',
        secl: '#9EC8B9',
        secd: '#5C8374',
        test: '#ECF4D6',
      },
      fontFamily: {
        yaro: ['yaro'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'alligator-search': "url('../public/gator-searching.png')"
      },
    },
  },
  plugins: [],
}
export default config
