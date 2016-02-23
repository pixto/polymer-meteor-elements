if (process.env.NODE_ENV == 'development'){
  var bower = Npm.require("bower");
  var path = Npm.require('path');
  var bowerCommands = ["install", "list"];

  config.dest_dir = process.env.POLYMER_DIR || 'public/bower_components'; 
  
  Bower = {};

  // Wrap every asynchronus bower command with `Meteor.wrapAsync`
  _.forEach(bowerCommands, function (command) {
    Bower[command] = Meteor.wrapAsync(function() {
      argsArray = _.toArray(arguments);
      var callback = argsArray.pop();
      bower.commands[command]
      .apply(this, argsArray)
      .on('end', function(res) { callback(null, res); })
      .on('error', function(err) { callback(err, null); });
    });
  });

  var dir = path.join(path.relative(process.cwd(), process.env.PWD), config.dest_dir);
  var localCache = _.values(Bower.list(null, {offline: true, directory: dir}).pkgMeta.dependencies);
  if (!_.contains(localCache, config.pkg)){
    console.log('installing ' + config.pkg);
    Bower.install([config.pkg], {save: true}, {directory: dir});
  }
}