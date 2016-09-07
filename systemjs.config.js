/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  var angular2ModalVer = '@2.0.0-beta.11';
  global.angular2ModalVer = angular2ModalVer;
  // map tells the System loader where to look for things
  var map = {
    'app':                            'app', // 'dist',
    '@angular':                       'node_modules/@angular',
    'angular2-in-memory-web-api':     'node_modules/angular2-in-memory-web-api',
    'rxjs':                           'node_modules/rxjs',
    '@angular2-material':             'node_modules/@angular2-material',
    'ng2-cache':                      'node_modules/ng2-cache',
    'ng2-facebook-sdk':               'node_modules/ng2-facebook-sdk/dist',
    'ng2-modal':                      'node_modules/ng2-modal',
    'ng2-pagination':                 'node_modules/ng2-pagination'    
  };


  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                            { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                           { defaultExtension: 'js' },
    'angular2-in-memory-web-api':     { main: 'index.js', defaultExtension: 'js' },
    'ng2-cache':                      { defaultExtension: 'js' },
    'ng2-facebook-sdk':               { main: 'index.js', defaultExtension: 'js' },
    'ng2-modal':                      { main: 'index.js', defaultExtension: 'js' },
    'ng2-pagination':                 { main: 'index.js', defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade'
  ];

  const materialPkgs = [
    'core',
    'button',
    'card',
    'input',
    'toolbar',
    'checkbox',
    'radio'
  ];

  materialPkgs.forEach((pkg) => {
    packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
  });

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
