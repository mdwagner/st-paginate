exports.config = {
  namespace: 'stencilpaginate',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ],
  bundles: [
    { components: ['stencil-paginate'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
