Package.describe({
  name: 'pixto:polymer-meteor-elements',
  version: '0.3.0',
  summary: 'Polymer meteor elements',
  git: 'https://github.com/pixto/polymer-meteor-elements',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "polymer-compiler",
  use : [
    'underscore'
  ],
  npmDependencies: {
    "vulcanize": "1.14.6",
    "bower": "1.5.2"
  },
  sources: [
    "installer.js",
    "vulcanize.js",
    "polymer-compiler.js"
  ]
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use("isobuild:compiler-plugin@1.0.0");
  api.imply(['tracker','mongo','session','ejson'],'client');
  api.use('dburles:mongo-collection-instances@0.3.5','client');
});
