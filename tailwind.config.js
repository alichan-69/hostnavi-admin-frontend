module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  preserveHtmlElements: false,
  important: true,
  theme: {
    screens: {
      tablet: { max: '1024px' },
      sm: { max: '600px' },
    },
    colors: {
      primary: '#f69502',
      secondary: '#222',
      thirdly: '#fff',
      icon: '#757575',
      warning: '#ff3265',
      backGround: '#f6f4f3',
    },
    fontSize: {
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
    },
  },
  variants: {
    cursor: ['hover'],
  },
  plugins: [require('tailwindcss-children'), require('@tailwindcss/line-clamp')],
};
