/**
 * Created by user on 2017. 5. 23..
 */

/**
 * Module
 */
const fs = require('fs');


/**
 * Custom Module
 */
const elementAnalyze = require('./data_set.js');

/**
 * Global Variable
 */
var inputDir = './input';
var outputDir = './output';

/**
 * Recursive Search
 */
(function searchDir(dir) {
    fs.readdir(dir, function (err, files) {
        files.forEach(function (file) {
            var path = [dir,file].join('/');
            fs.stat(path, function (err, stats) {
                (stats.isDirectory()) ? searchDir(path): fileProcess(path);
            })
        });
    });

    //File Process
    function fileProcess(path) {
        var paths = path.split('.');
        var pathsLen = paths.length;

        //HTML Validation
        if(paths[pathsLen - 1] !== 'html') {
            console.warn(path, "- This file is not a HTML file");
            return;
        }

        var fileNms = paths[pathsLen - 2].split('/');

        //Analysis Polymer Element
        elementAnalyze(path);

    }
})(inputDir);

