var Future = Npm.require("fibers/future");
var vulcanize = Npm.require("vulcanize");
var crisper = Npm.require("crisper");
var babel = Npm.require("babel-core");

Vulcanize = {};

Vulcanize.vulcanizeImport = function(importFile) {
  var fut = new Future();

  vulcanize.setOptions({
    abspath: ".",
    inlineCss: true,
    inlineScripts: true,
    stripComments: true
  });

  vulcanize.process(importFile, function(err, html) {
    if (err) {
      console.error(err);
      fut.return('');
    } else {
      // crisper seperate html and js
      var out = crisper({
        source: html,
        scriptInHead: false
      });
      try {
        out.js = babel.transform(out.js, {
          ast: false,
          comments: false,
          plugins: [
            "check-es2015-constants",
            "transform-es2015-arrow-functions",
            "transform-es2015-block-scoped-functions",
            "transform-es2015-block-scoping",
            "transform-es2015-classes",
            "transform-es2015-computed-properties",
            "transform-es2015-destructuring",
            "transform-es2015-duplicate-keys",
            "transform-es2015-for-of",
            "transform-es2015-function-name",
            "transform-es2015-literals",
            //"transform-es2015-modules-commonjs",
            "transform-es2015-object-super",
            "transform-es2015-parameters",
            "transform-es2015-shorthand-properties",
            "transform-es2015-spread",
            "transform-es2015-sticky-regex",
            "transform-es2015-template-literals",
            "transform-es2015-typeof-symbol",
            "transform-es2015-unicode-regex",
              "transform-regenerator"
          ]
        }).code;
      } catch (err) {
        console.error("Babel transform error : you should have es2015 presets installed to get es2015 support", err);
      }
      fut.return({
        html: out.html,
        js: out.js
      });
    }
  });
  return fut.wait();
}
