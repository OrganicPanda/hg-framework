module.exports = {
  src: 'app',
  dest: 'dist',
  vendor: 'vendor',
  layout: {
    src: 'app/core/layout/layout-tpl.html',
    dest: 'public/index.html'
  },
  colors: {
    src: 'app/core/styling/_vars/colors.scss',
    dest: 'app/core/colors/colors.js'
  },
  sassVars: [
    'app/core/styling/variables.scss',
    'app/core/styling/_vars/*.scss'
  ]
};
