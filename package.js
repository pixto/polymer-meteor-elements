Package.describe({
  name: 'pixto:polymer-meteor-elements',
  version: '0.4.0',
  summary: 'Polymer meteor elements',
  git: 'https://github.com/pixto/polymer-meteor-elements',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "polymer-compiler",
  use : [
    "underscore",
    "ecmascript"
  ],
  npmDependencies: {
    "vulcanize": "1.14.8",
    "bower": "1.5.2",
    "crisper": "2.0.2",
    "babel-core": "6.9.1"
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
  api.use("ecmascript");
  api.use("underscore");
  api.use("webapp",'server');
  api.imply(['tracker','mongo','session','ejson'],'client');
  api.use('dburles:mongo-collection-instances@0.3.5','client');
  api.addFiles('webhandler.js','server');
});
