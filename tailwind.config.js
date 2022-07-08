/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./node_modules/flowbite/**/*.js",
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'content/**/*.md',
  ],
  theme: {
    boxShadow: {
      'datatable': '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)',
    },
    dropShadow: {
      'container': '0 0 69px 6px rgba(0, 0, 0, 0.15)',
      'datatable': '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      test: {
        light: '#55b3d1',
        yellow: '#FFD600',
      },
      admin: {
        sidebar: '#17277D',
        sidebarTop: '#1D2558',
        background: '#F2F4F5',
        white: '#FFFFFF',
        gutter: '#E5E5E5',
        button: '#C4C4C4',
      },
    }),
    backgroundPosition: {
      'center': 'center',
    },
    extend: {
      backgroundImage: {
        'oceanBackground': 'url("/images/admin/Ocean-Background.jpg")',
        'dive-banner': 'url("/images/front/banner.jpeg")',
        'footer': 'url("/images/front/footer.png")',
        'gallery': 'url("/images/front/banner/gallery.jpeg")',
        'admingalleryAddAlbum': 'url("/images/admin/gallery-new-album.jpg")',
        'admingalleryExample': 'url("/images/admin/image_example.jpg")',
      },
      width: {
        '528': '33rem',
      }
    },
    fontFamily: {
      'sans': ['Quicksand', 'Arial', 'sans-serif'],
      'title-homepage-h1': ['Rock Salt', 'Arial', 'sans-serif'],
    },
    textColor: theme => ({
      ...theme('colors'),
      'default': '#6A6A6A',
      white: "#FFF",
      grey: '#C3C6CC',
    }),
    screens: {
      'mobile': { 'max': '639px' },
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('flowbite/plugin'),
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
}
