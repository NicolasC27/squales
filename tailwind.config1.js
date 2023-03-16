/** @type {import('tailwindcss').Config} */
const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: "class",
  // content: [
  //   "./node_modules/flowbite.{js,ts}",
  //
  //   "components/**/*.vue",
  //   "layouts/**/*.vue",
  //   "pages/**/*.vue",
  //   "plugins/**/*.js",
  //   "content/**/*.md",
  //   // path.resolve(__dirname, "./node_modules/litepie-datepicker/**/*.js"),
  // ],
  theme: {
    boxShadow: {
      datatable: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
    },
    dropShadow: {
      container: "0 0 69px 6px rgba(0, 0, 0, 0.15)",
      datatable: "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      test: {
        light: "#55b3d1",
        yellow: "#FFD600",
      },
      admin: {
        sidebar: "#17277D",
        sidebarTop: "#1D2558",
        background: "#F2F4F5",
        white: "#FFFFFF",
        gutter: "#E5E5E5",
        button: "#C4C4C4",
      },
    }),
    backgroundPosition: {
      center: "center",
    },
    extend: {
      backgroundImage: {
        oceanBackground: 'url("/images/admin/Ocean-Background.jpg")',
        "dive-banner": 'url("/images/front/banner.jpeg")',
        "gallery-banner": 'url("/images/front/diver-banner.png")',
        footer: 'url("/images/front/footer.png")',
        gallery: 'url("/images/front/banner/gallery.jpeg")',
        admingalleryAddAlbum: 'url("/images/admin/gallery-new-album.jpg")',
        admingalleryExample: 'url("/images/admin/image_example.jpg")',
      },
      width: {
        528: "33rem",
      },
      cursor: {
        deleteMode:
          "url(\"data:image/svg+xml;charset=UTF-8,%3csvg width='32' height='32' fill='none' stroke='white' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'%3e%3c/path%3e%3c/svg%3e\"), pointer",
      },
      colors: {
        // Change with you want it
        "litepie-primary": colors.sky, // color system for light mode
        "litepie-secondary": colors.gray, // color system for dark mode
      },
    },

    textColor: (theme) => ({
      ...theme("colors"),
      default: "#6A6A6A",
      white: "#FFF",
      grey: "#C3C6CC",
    }),
    screens: {
      mobile: { max: "639px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [
    require("flowbite"),

    // plugin(({ addComponents }) => {
    //   const buttons = {
    //     '.btn': {
    //       'font-size': '0.9375rem',
    //       'line-height': '0.9375rem',
    //       'cursor': 'pointer',
    //       'text-align': 'center',
    //       'color': 'white',
    //       'border-radius': '11px',
    //       'padding': '.5rem 1rem',
    //       'fontWeight': '600',
    //     },
    //     '.btn-blue': {
    //       'backgroundColor': '#3490dc',
    //       'color': '#fff',
    //       '&:hover': {
    //         backgroundColor: '#2779bd',
    //       },
    //     },
    //     '.btn-red': {
    //       'backgroundColor': '#e3342f',
    //       'color': '#fff',
    //       '&:hover': {
    //         backgroundColor: '#cc1f1a',
    //       },
    //     },
    //   }
    //   addComponents(buttons)
    // }),
  ],
};
