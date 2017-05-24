/**
 * Created by JongHyeok Choi on 2017. 5. 23..
 */

"use strict"

const hyd = require('hydrolysis');
const _ = require('underscore');
const xml2js = require('xml2js');
const fs = require('fs');

module.exports = (path) => {
    return analyze(path);
};

let analyze = (path)=> {
    //Analysis Polymer Element
    hyd.Analyzer.analyze(path)
        .then(settingData);
}

let parser = new xml2js.Parser();
let settingData = (analyzer) => {
    analyzer.elements.forEach((element) => {
        fs.readFile('./format_example/Base.xml', function(err, data) {
            parser.parseString(data, function (err, result) {
                console.dir(result);
                console.log('Done');
            });
        });

        fnExcute(webstormHandler.is);
    });
}

let fnExcute = (fn, ...args) => {
    return _.isFunction(fn) ? fn.apply(webstormHandler, args) : fn;
}

let webstormHandler = {
    is: (tmp, value) => {
        //console.log(value);
    }
}