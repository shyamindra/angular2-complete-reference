"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var index_1 = require("../../index");
var test_url_resolver_1 = require("./test_url_resolver");
var compiler_1 = require("@angular/compiler");
testing_1.resetBaseTestProviders();
testing_1.setBaseTestProviders(testing_2.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, platform_browser_dynamic_1.BROWSER_APP_COMPILER_PROVIDERS.concat(testing_2.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, index_1.MATERIAL_BROWSER_PROVIDERS, [
    { provide: compiler_1.UrlResolver, useValue: new test_url_resolver_1.TestUrlResolver() }
]));
function onlySpecFiles(path) {
    return /_spec\.js$/.test(path);
}
function load(files) {
    console.log('importing test modules: ');
    var error = function (e) {
        console.error(e);
    };
    var myZone = new Zone();
    myZone.fork({
        onError: function (e) {
            console.error("Zone Error:");
            console.error(e);
        }
    });
    var runTests = function (path) {
        return new Promise(function (resolve, reject) {
            myZone.run(function () {
                console.log(" - " + path);
                return System.import(path).then(function (module) {
                    if (module.hasOwnProperty('main')) {
                        try {
                            module.main();
                            resolve();
                        }
                        catch (e) {
                            error(e);
                            reject(e);
                        }
                    }
                    else {
                        console.warn(" - skipping " + path + " which does not implement main() method.");
                        reject('invalid file');
                    }
                });
            });
        });
    };
    var promises = Object
        .keys(files)
        .filter(onlySpecFiles)
        .map(runTests);
    return Promise.all(promises);
}
exports.load = load;
//# sourceMappingURL=bootstrap.js.map