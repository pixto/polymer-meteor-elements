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

and create a config.polymer in you app root :
```
{
  "directory" : ".polymer",
  "importFile": "/public/components/imports.html",
  "dependencies" : [
    "PolymerElements/paper-drawer-panel#1.0.6"
  ]
}
```
- **directory** : where Polymer and dependencies will be installed (default : .polymer)
- **importFile** : the file that include your imports
- **dependencies** : the polymer elements you needs

### What this package do ?

1. it install meteor elements and its dependencies (Polymer/polymer.html) using bower in the directory set in config.polymer
1. it install dependencies listed in config.polymer
1. it creates a symlink in public to polymer installation directory
1. it adds to ***head*** polyfill script and elements import

this behavior is different with the **VULCANIZE=true** environment variable, instead of create a symlink, elements are vulcanized and then import in ***head***. So this way **/public** is free of extra files.

### ES2015

With the **VULCANIZE=true** environment variable polymer element are vulcanized (all files in one), then html and javascript are splitted to be CSP compliant with cripser and finally javascript is transform to ES5.

Without VULCANIZE (development mode) files are not transformed so you should use an ES2015 browser compatible.


### Elements Documentation

Polymer meteor elements documentation is available here :

[https://pixto.github.io/polymer-meteor-elements/meteor-elements/](https://pixto.github.io/polymer-meteor-elements/meteor-elements/)



### Contribute

Please feel free to submit PR, if you submit an issue, please provide a simple project to reproduce it. You can easily modify the leaderboard example.
