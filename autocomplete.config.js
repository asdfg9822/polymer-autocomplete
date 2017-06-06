/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

/**
 * Module
 */
const path = require('path');

/**
 * Custom Module
 */
const MODE = require('./lib/mode.js');

/**
 * Your Version 1 Config
 */
const verConfig1 = {
    input: {
        path: './input', //Get Path
        test: /\.html/,  //Regular Expression for File Extention Check
        excludes: [
            /node_modules/,
            /demo/,
            /test/
        ], //Regular Expression for Exclude Directory
    },
    output: {
        path: './output/version1'
    }
}

/**
 * Your Version 2 Config
 */
const verConfig2 = {
    input: {
        path: './input', //Get Path
        test: /\.html/,  //Regular Expression for File Extention Check
        excludes: [
            /node_modules/,
        ], //Regular Expression for Exclude Directory
    },
    output: {
        path: './output/version2'
    },
    mode: MODE.CUSTOM_ANNOTATION,
    custom_annotation: 'SpecialAnnotation'
}

/**
 * Main Config.
 * You can create different outputs per component versions.
 */
const config = {
    context: __dirname + '/app', //__dirname is always the directory in which the currently executing script resides
    mode: MODE.PUBLIC,
    deploy: [
        {"version": "1.0.0", config: verConfig1, output: true},
        {"version": "1.0.1", config: verConfig2, output: true} //no output
    ]
};

module.exports = config;