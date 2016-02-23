_"If you haven't used Polymer before, it's time to try it out. If you haven't tried it recently, time to take another look."_

[https://www.polymer-project.org](https://www.polymer-project.org)

### Preambule
- This package is based on [meteor-elements](https://github.com/atoy40/meteor-elements) by atoy40.
- Keep in mind that Polymer is very different from Blaze/React/Angular

### Quick Example

The code snippets below show how to handle a request to a Meteor collection

```html
<meteor-collection name="peoples" on-insert="_onInsert">
  <meteor-query query='{ "age": 18 }' options='{"sort": { size: -1 } }' data="{{eighties}}"></meteor-query>
</meteor-collection>

<template is="dom-repeat" items="{{eighties}}">
  <div>
    <span>{{item.name}}</span>
  </div>
</template>
```
### Philosophy
**polymer-meteor-elements** aims to provide Meteor world to Polymer world (vs Polymer in Meteor). It means that you will create a polymer project with the powerfull of Meteor : DDP, method, package, etc ... using elements and enjoy Polymer data binding:
```html
<meteor-session name="mainPanelIsActivated" result="{{isMainPanelIsActivated}}"></meteor-session>

<div hidden$="{{isMainPanelIsActivated}}">
  ...
</div>
```
Of course you could use Meteor 'classic' javascript in element :
```js
ready : function() {
  this.random = Random.id();
}
```


### Leaderboard-polymer

To get the simple structure needs to run meteor element report to the leaderboard example here :

[https://github.com/pixto/polymer-leaderboard](https://github.com/pixto/polymer-leaderboard)

### Installation

Add this package to your project, run:
```
meteor add pixto:polymer-meteor-elements
```

### Documentation

Polymer meteor elements documentation is available here :

[https://pixto.github.io/polymer-meteor-elements/meteor-elements/](https://pixto.github.io/polymer-meteor-elements/meteor-elements/)

### Polymer Installation

This package doesn't handle Polymer installation (except its own dependencies).

Default installation directory is (app-root)/public/bower_components but this can be changed with POLYMER_DIR env.
```bash
POLYMER_DIR=/private/bower_components
```
to install polymer you can use pixto:polymer packages :
```bash
meteor add pixto:polymer-iron-elements
meteor add pixto:polymer-paper-elements
meteor add pixto:polymer-neon-elements
meteor add pixto:polymer-gold-elements
meteor add pixto:polymer-platinium-elements
```
### Import elements

To import your elements you can use [differential:vulcanize](https://github.com/Differential/meteor-vulcanize) to import and 'vulcanize' polymer elements :
```bash
meteor add differential:vulcanize
```

create a **config.vulcanize** in the root of you project :
```json
{
  "polyfill": "/bower_components/webcomponentsjs/webcomponents-lite.min.js",
  "useShadowDom": false,
  "imports": [
    "/components/leaderboard-app.html"
  ]
}
```
### Contribute

Please feel free to submit PR, if you submit an issue, please provide a simple project to reproduce it. You can easily modify the leaderboard example.
