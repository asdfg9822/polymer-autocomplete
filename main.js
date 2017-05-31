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
 * Editor Snippet Base Template
 */
const webstormTmp = require('./base_format/webstorm.js');
const atomTmp = require('./base_format/atom.js');

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
    //Target File Paths in Target Directory (config.input.path in snippet.config.js)
    let promises = targetPaths.map(function (path) {
        return elementAnalyze(path);
    });

    Promise.all(promises)
        .then((result) => {
            //reuslt is Promise Return Value Array.
            let elementList = [];
            result.forEach((elements) => { elements.forEach((element) => {
                elementList.push(element);
            })});

            //Template Array iterator
            [
                {dataObj: webstormTmp(elementList), filename: "webstorm-polymer.xml"},
                {dataObj: atomTmp(elementList), filename: "atom-polymer.cson"}
                /*
                {dataObj: sublimeTmp(elementList), filename: "sublime-polymer.xml"},
                {dataObj: vscodeTmp(elementList), filename: "vscode-polymer.xml"}*/
            ].forEach((obj) => {
                //Write File
                fs.writeFile(dir + '/' + obj.filename, obj.dataObj, (err) => {
                    if (err) throw err;
                    console.log(obj.filename, 'file has been saved!');
                });
            });
        });
})(targetPaths, CONFIG.output.path);