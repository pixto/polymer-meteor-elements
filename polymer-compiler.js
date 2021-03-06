var meteorElements = 'pixto/meteor-elements#^0.2.2';

var fs = Npm.require('fs');
var path = Npm.require('path');
var crypto = Npm.require('crypto');

function PolymerCompiler() {
}

PolymerCompiler.prototype.processFilesForTarget = function(files) {
  files.forEach(function(file) {
    console.log("=> Start Polymer settings ... ");
    try {
      var config = JSON.parse(file.getContentsAsString());
    } catch(e) {
      console.err( "failed to parse pconfig.polymer ", e);
    }
    config.directory = (config.directory || '/public') + '/bower_components';
    config.importFile = config.importFile || "";
    config.dependencies = config.dependencies || [];
    config.polyfill = config.polyfill || "/bower_components/webcomponentsjs/webcomponents-lite.js";

    // install meteor-elements
    BowerInstaller.install(meteorElements, config.directory );

    // install dependencies
    _.each(config.dependencies, function(dependency) {
      BowerInstaller.install(dependency, config.directory);
    });

    /*
    *     vulcanize or not ?
    */

    // link to polymer dir.
    try {
      if(fs.statSync('./public/bower_components', fs.F_OK))
      fs.unlinkSync('./public/bower_components');
    } catch (e) { }

    fs.symlinkSync('../' + config.directory, './public/bower_components');

    if(process.env.VULCANIZE) {


      // add polyfill js script webcomponents-lite.js
      var polyfillPath = path.relative('/bower_components/' , config.polyfill);
      file.addAsset({
        path: polyfillPath,
        data: fs.readFileSync(config.directory + '/../' + config.polyfill)
      });
      var polyfill = '<script src="/' + polyfillPath + '" async></script>';
      file.addHtml({ section: 'head', data: polyfill});


      var out = Vulcanize.vulcanizeImport(config.importFile);
      var hash = crypto.createHash('md5').update(out.html).digest('hex');
      console.log('Polymer vulcanized hash : ', hash);
      var filePath = '/vulcanized-' + hash;
      // add HTML

      var importJsTag = '<script src="' + filePath+ '.js' + '" async></script></body>';
      var _html = out.html.replace('</body>',importJsTag );
      file.addAsset({
        path: filePath+ '.html',
        data: _html
      });
      var importHtmlTag = '<link rel="import" href="' + filePath + '.html' + '">';
      file.addHtml({ section: 'head', data: importHtmlTag});


      // add JS
      file.addAsset({
        path: filePath+ '.js',
        data: out.js
      });
      /*
      var importJsTag = '<script src="' + filePath+ '.js' + '"></script>';
      file.addHtml({ section: 'head', data: importJsTag});
      */

      // unlink to polymer dir
      fs.unlinkSync('./public/bower_components');

    } else {
      // Import web elements
      var importTag = '<link rel="import" href="/' + path.relative('/public' , config.importFile) + '">';
      file.addHtml({ section: 'head', data: importTag});

      var polyfill = '<script src="' + config.polyfill + '" async></script>';
      file.addHtml({ section: 'head', data: polyfill});
    }
  });
};



Plugin.registerCompiler({
  filenames: ["config.polymer"],
  archMatching: 'web'
}, function() {
  var compiler = new PolymerCompiler();
  return compiler;
});
