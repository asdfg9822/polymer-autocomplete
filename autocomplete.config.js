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
            /old/,
            /v22/,
            /test/
        ], //Regular Expression for Exclude Directory
    },
    output: {
        path: './output/PUBLIC'
    },
    mode: MODE.PUBLIC
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
        path: './output/CUSTOM_ANNOTATION'
    },
    mode: MODE.CUSTOM_ANNOTATION,  //If mode is 'CUSTOM_ANNOTATION', you must register custom annotation property.
    custom_annotations: ['SpecialAnnotation']
}

/**
 * Main Config.
 * You can create different outputs per component versions.
 */
const config = {
    context: __dirname + '/app', //__dirname is always the directory in which the currently executing script resides
    mode: MODE.ALL,
    value_annotation: 'value',
    deploy: [
        {"version": "1.0.0", config: verConfig1, output: true},
        {"version": "1.0.1", config: verConfig2, output: true} //no output
    ]
};

module.exports = config;