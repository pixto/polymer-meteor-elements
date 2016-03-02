var Future = Npm.require("fibers/future");
var vulcanize = Npm.require("vulcanize");
var crisper = Npm.require("crisper");
var babel = Npm.require("babel-core");

Vulcanize = {};

Vulcanize.vulcanizeImport = function(importFile) {
  var fut = new Future();

  vulcanize.setOptions({
    abspath: ".",
    implicitStrip: true,
    inlineCss: true,
    inlineScripts: true,
    stripComments: true
  });

  vulcanize.process(importFile, function(err, html) {
    if(err) {
      console.error(err);
      fut.return('');
    } else {
      // crisper seperate html and js
      var out = crisper({
        source: html,
        scriptInHead: false
      });
      out.js = Babel.compile(out.js).code;
      fut.return({html : out.html, js : out.js});
    }
  });
  return fut.wait();
}
