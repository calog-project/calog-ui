import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#112D4E',
        blue: {
          '3f': '#3F72AF',
          76: '#76A5EA',
          db: '#DBE2EF',
        },
        gray: {
          78: '#787486',
          '9f': '#9FA6B2',
          d9: '#D9D9D9',
          ee: '#EEEEEE',
          fa: '#FAFAFA',
        },
        black: {
          DEFAULT: '#000',
          17: '#171717',
          33: '#333236',
          '4b': '#4B4B4B',
          overlay: 'rgba(0, 0, 0, 0.70)', // 모달창 뒷 배경
        },
        red: '#D6173A',
        green: '#7AC555',
        purple: '#760DDE',
        orange: '#FFA500',
        pink: '#E876EA',
        white: '#FFF',
        'beige-f9': '#F9F7F7',
      },
      screens: {
        tablet: { max: '1199px' },
        mobile: { max: '767px' },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      zIndex: {
        DEFAULT: '1',
        dropdown: '200',
        sticky: '400',
        popover: '600',
        overlay: '800',
        modal: '1000',
        toast: '1200',
      },
      boxShadow: {
        custom: '0px 0px 8px 0px rgba(0, 0, 0, 0.20)',
      },
    },
  },
  plugins: [],
};
export default config;
