/**
 * Created by JongHyeok Choi on 2017. 5. 23..
 */

"use strict"

/**
 * Module
 */
const hyd = require('hydrolysis');
const _ = require('underscore');
const xml2js = require('xml2js');
const fs = require('fs');

/**
 * Custom Module
 */
const MODE = require('./mode.js');
const CONFIG = require('./snippet.config.js');

module.exports = (path) => {
    return new Promise((resolve, reject) => {

        //Analysis Polymer Element
        hyd.Analyzer.analyze(path)
            .then(settingData)
            .then((data) => {
                resolve(data);
            });
    });
};

let settingData = (analyzer) => {
    return new Promise((resolve, reject) => {

        //기본 템플릿 불러오기
        let parser = new xml2js.Parser();
        fs.readFile('./format_example/Base.xml', function (err, data) {
            parser.parseString(data, (err, tmp) => {

                //Element별로 처리
                var templates = analyzer.elements.map((element) => {
                    let eleObj = {
                        $: {}
                    };

                    fnExcute(webstormHandler.is, eleObj.$, element.is);
                    fnExcute(webstormHandler.desc, eleObj.$, "test");

                    element.properties.forEach((p) => {
                        //Properties Type이 getter 또는 Function이 아닐 때
                        if (p.type === "" || p.type === 'Function') {

                        } else if (CONFIG.mode === MODE.ALL) {
                            //console.log(p.name, p.type);

                        } else if (CONFIG.mode === MODE.EXIST_ANNOTATION) {

                        } else if (CONFIG.mode === MODE.EXIST_DESC) {

                        } else if (CONFIG.mode === MODE.CUSTOM_ANNOTATION) {

                        }
                    });

                    //Push Data
                    return eleObj;
                });

                resolve(templates);
            });
        });
    });
}

//fn이 함수이면 결과 값 반환 아니면 undefined
let fnExcute = (fn, ...args) => {
    if (_.isFunction(fn)) {
        return fn.apply(webstormHandler, args);
    }
    return undefined;
}

//Webstrom Code Snippet Config Handler
let webstormHandler = {
    is: (tmp, value) => {
        tmp.name = value;
    },
    desc: (tmp, value) => {
        tmp.description = value;
    }
}

//Atom Code Snippet Config Handler
let atomHandler = {
    is: (tmp, value) => {
        tmp.name = value;
    },
    desc: (tmp, value) => {
        tmp.description = value;
    }
}

//Sublime Code Snippet Config Handler
let sublimeHandler = {
    is: (tmp, value) => {
        tmp.name = value;
    },
    desc: (tmp, value) => {
        tmp.description = value;
    }
}

//VS Code Snippet Config Handler
let vscodeHandler = {
    is: (tmp, value) => {
        tmp.name = value;
    },
    desc: (tmp, value) => {
        tmp.description = value;
    }
}