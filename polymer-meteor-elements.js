// Write your package code here!

function importTag(path) {
  return '<link rel="import" href="' + path + '">';
}

function PolymerElementsCompiler() {}
PolymerElementsCompiler.prototype.processFilesForTarget = function (files) {
  files.forEach(function (file) {
    console.log("import polymer-meteor-elements");
    // add assets to head [TODO] Vucanize
    file.addHtml({ section: 'head', data: importTag("/packages/eskan_polymer-meteor-elements/meteor-elements/meteor-elements.html") });
  });
};

Plugin.registerCompiler({
  filenames: ["config.polymer"],
  archMatching: 'web'
}, function(){
  return new PolymerElementsCompiler();
});
