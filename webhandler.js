// The idea is to log 404 files to know when an import is unresolved

Meteor.startup(function () {
  if(process.env.HTTP_404) {
    const path = Npm.require('path');
    const fs = Npm.require('fs');
    const uri = Npm.require('url');

    WebApp.rawConnectHandlers.use(function(req, res, next) {
      var url = uri.parse(req.url);
      var pathname = url.pathname;
      const filename = path.join(process.cwd(),'../../programs/web.browser/app/' + pathname);
      try {
        if(!pathname.match("^\/packages"))
          fs.statSync(filename, fs.F_OK);
      } catch (e) {
        console.log("Polymer 404 check => this url can't be resolved : ", pathname);
      }
      next();
    });
  }
});
