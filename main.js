/**
 * Created by user on 2017. 5. 23..
 */

/**
 * Module
 */
const fs = require('fs');
const xml2js = require('xml2js');
const _ = require('underscore');

/**
 * Custom Module
 */
const elementAnalyze = require('./data_set.js');
const CONFIG = require('./snippet.config.js');


/**
 * Global Variable
 */

/**
 * Recursive Search
 */
let targetPaths = [];
(function searchDir(dir) {
    let files = fs.readdirSync(dir);

    files.forEach(function (file) {
        let path = [dir,file].join('/');
        let stats = fs.statSync(path);

        if(stats.isDirectory()) {
            let isPathValid = CONFIG.input.excludes.every(function (exclude) {
                return exclude.test(path) ? false: true;
            });
            if(isPathValid) {
                searchDir(path);
            }
        } else if(CONFIG.input.test.test(path)) {
            targetPaths.push(path);
        }
    });

})(CONFIG.input.path);

((targetPaths, dir) => {

    let promises = targetPaths.map(function (path) {
        return elementAnalyze(path);
    });

    Promise.all(promises)
        .then((result) => {
            //JSON to XML
            let builder = new xml2js.Builder();
            let xml = builder.buildObject({
                template: {template: result}
            });

            //Write File
            fs.writeFile(dir + '/Webstorm/Polymer.xml', xml, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        });
})(targetPaths, CONFIG.output.path);