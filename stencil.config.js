exports.config = {
  namespace: 'stpaginate',
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
    { components: ['st-paginate'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
