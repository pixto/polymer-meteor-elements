Package.describe({
  name: 'pixto:polymer-meteor-elements',
  version: '0.2.1',
  summary: 'Polymer meteor elements',
  git: 'https://github.com/pixto/polymer-meteor-elements',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.imply(['tracker','mongo','session','ejson'],'client');
  api.use('dburles:mongo-collection-instances@0.3.5','client');
  api.use('underscore');
  api.addFiles('polymer-meteor-elements.js', 'server');
});

Npm.depends({
	bower: '1.5.2'
});
