var Future = Npm.require("fibers/future");
var vulcanize = Npm.require("vulcanize");

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
      fut.return(html);
    }
  });
  return fut.wait();
}
