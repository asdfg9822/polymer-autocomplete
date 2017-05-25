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
let result = {
    template: {}
};

    analyzer.elements.forEach((element) => {
        fs.readFile('./format_example/Base.xml', function(err, data) {
            //parser.parseString(data, {'newline': '\n'}, (err, tmp) => {
                let $ = result.template["$"] = {};

                fnExcute(webstormHandler.is, $, element.is);
                fnExcute(webstormHandler.desc, $, "test");

                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);

                console.log(xml);

                fs.writeFile('./output/Result.xml', xml, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            //});
        });
    });
}

let fnExcute = (fn, ...args) => {
    return _.isFunction(fn) ? fn.apply(webstormHandler, args) : fn;
}

let webstormHandler = {
    is: (tmp, value) => {
        tmp.name = value;
    },
    desc: (tmp, value) => {
        tmp.description = value;
    }
}