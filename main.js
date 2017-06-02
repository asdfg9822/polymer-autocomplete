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
const atomTmp2 = require('./base_format/atom_complete.js');


CONFIG.deploy.forEach((obj) => {
    let config = obj.config;
    let targetPaths = [];

    if (obj.output) {
        console.log(obj.version, "-> input");

        searchDir.call(config, targetPaths, config.input.path);
        writeTemplate.call(config, targetPaths, config.output.path);

    } else {
        console.log(obj.version, "-> output excepted");
    }
});

/**
 * Recursive Search
 */
function searchDir(targetPaths, dir) {
    let files = fs.readdirSync(dir);
    let config = this;

    files.forEach(function (file) {
        let path = [dir, file].join('/');
        let stats = fs.statSync(path);

        if (stats.isDirectory()) {
            let isPathValid = CONFIG.input.excludes.every(function (exclude) {
                return exclude.test(path) ? false : true;
            });
            if (isPathValid) {
                searchDir(path);
            }
        } else if (config.input.test.test(path)) {
            targetPaths.push(path);
        }
    });
};

/**
 * Write Snippet & Auto Complete File
 */
function writeTemplate(targetPaths, dir) {
    let config = this;
    //Target File Paths in Target Directory (config.input.path in snippet.config.js)
    let promises = targetPaths.map(function (path) {
        return elementAnalyze(path);
    });

    Promise.all(promises)
        .then((result) => {
            //reuslt is Promise Return Value Array.
            let elementList = [];
            result.forEach((elements) => {
                elements.forEach((element) => {
                    elementList.push(element);
                })
            });

            //Directory exist check
            //if there is no directory, create it
            if(!fs.existsSync(dir)) {
                _.reduce(dir.split("/"), function (path, curr) {
                    var dirPath = path + "/" + curr;
                    if(!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath);
                    }
                    return dirPath;
                });
            }

            //Template Array iterator
            [
                {dataObj: webstormTmp(elementList), filename: "webstorm-polymer.xml"},
                {dataObj: atomTmp(elementList), filename: "atom-polymer.cson"},
                {dataObj: atomTmp2(elementList), filename: "atom-polymer.js"}
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
};