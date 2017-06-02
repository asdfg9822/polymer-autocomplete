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
const elementAnalyze = require('./polymer_data_set.js');
const CONFIG = require('./snippet.config.js');

/**
 * Editor Snippet Base Template
 */
const webstormTmp = require('./lib/base_format/webstorm.js');
const atomTmp = require('./lib/base_format/atom.js');
const atom_autocomplete = require('./lib/template_autocomplete/atom_autocomplete.js');

/**
 * Main Function Start
 */
CONFIG.deploy.forEach((obj) => {
    let config = obj.config,
        targetPaths = [];

    if (obj.output) {   //snippet.config.deploy.output =  True
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
    let files = fs.readdirSync(dir),
        config = this;

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
                    let dirPath = path + "/" + curr;
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
                {dataObj: atom_autocomplete(elementList), filename: "atom-polymer.js"}
            ].forEach((obj) => {
                //Write File
                fs.writeFile(dir + '/' + obj.filename, obj.dataObj, (err) => {
                    if (err) throw err;
                    console.log(obj.filename, 'file has been saved!');
                });
            });
        });
};