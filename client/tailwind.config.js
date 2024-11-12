/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',

        'custom': 'repeat(12, 90px)'
      },
      colors: {
        "first": "#222222",
        "acc": "#c03221",
        'sec': '#f7f7ff',
        'vour': '#f2d0a4'
      }
     /*   colors: {
          "first": "#0d1f2d",
          "acc": "#dd614a",
          'sec': '#f5f2b8',
          'vour': '#f2d0a4'
        }
          */
       /* colors: {
          "first": "#22223b",
          "acc": "#92dce5",
          'sec': '#eee5e9',
          'vour': '#f2d0a4'
        }
          */
       /* colors: {
          "first": "#0f1020",
          "acc": "#e3b23c",
          'sec': '#edebd7',
          'vour': '#f2d0a4'
        }*/
    },
  },
  plugins: [],
}