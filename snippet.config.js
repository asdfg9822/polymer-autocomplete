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
const MODE = require('./mode.js');

/**
 * Your Version 1 Config
 */
const verConfig1 = {
    input: {
        path: './input', //Get Path
        test: /\.html/,  //Regular Expression for File Extention Check
        excludes: [
            /node_modules/,
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
    }
}

const config = {
    context: __dirname + '/app', //__dirname is always the directory in which the currently executing script resides
    mode: MODE.ALL,
    deploy: [
        {"version": "1.0.0", config: verConfig1, output: true},
        {"version": "1.0.0", config: verConfig2} //Set no output
    ]
};

module.exports = config;