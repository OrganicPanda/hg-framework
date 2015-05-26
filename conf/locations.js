module.exports = {
  src: 'app',
  dest: 'dist',
  data: 'data',
  vendor: 'vendor',
  layout: {
    src: 'app/core/layout/layout-tpl.html',
    dest: 'public/index.html'
  },
  sassVars: [
    'app/core/styling/variables.scss',
    'app/core/styling/_vars/*.scss'
  ],
  sassMixins: [
    'app/core/styling/mixins.scss',
    'app/core/styling/_mixins/*.scss'
  ],
  sharedVars: {
    dest: 'app/core/styling/styling.js',
    src: [
      'app/core/styling/_vars/animations.scss',
      'app/core/styling/_vars/colors.scss',
      'app/core/styling/_vars/sizes.scss',
      'app/core/styling/_vars/type.scss'
    ]
  }
};
