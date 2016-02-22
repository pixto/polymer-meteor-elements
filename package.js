Package.describe({
  name: 'pixto:polymer-meteor-elements',
  version: '0.1.3',
  summary: 'Polymer meteor elements',
  git: 'https://github.com/pixto/polymer-meteor-elements',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'polymer-meteor-elements',
  sources: [
    'polymer-meteor-elements.js'
  ]
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('dburles:mongo-collection-instances@0.3.5');
  api.addAssets('meteor-elements/meteor-collection.html','client');
  api.addAssets('meteor-elements/meteor-connection.html','client');
  api.addAssets('meteor-elements/meteor-elements.html','client');
  api.addAssets('meteor-elements/meteor-query.html','client');
  api.addAssets('meteor-elements/meteor-subscribe.html','client');
  api.addAssets('meteor-elements/meteor-user.html','client');
  api.addAssets('meteor-elements/meteor-call.html','client');
  api.addAssets('meteor-elements/meteor-session.html','client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('pixto:polymer-meteor-elements');
  api.addFiles('polymer-meteor-elements-tests.js');
});
