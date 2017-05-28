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


const config = {
    context: __dirname + '/app', //__dirname is always the directory in which the currently executing script resides
    mode: MODE.ALL,
    input: {
        path: './input', //Get Path
        test: /\.html/,  //Regular Expression for File Extention Check
        excludes: [
           /node_modules/,
        ], //Regular Expression for Exclude Directory
    },
    output: {
        path: './output'
    }
};

module.exports = config;