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
const MODE = require('./lib/mode.js');
const CONFIG = require('./snippet.config.js');

/**
 * Deliver Analazed Polymer Infomation
 */
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

/**
 * Generate Data for Template
 */
let settingData = (analyzer) => {
    return new Promise((resolve, reject) => {

        //Element별로 처리
        let templates = analyzer.elements.map((element) => {

            var eleObj = {
                value : htmlEscape`<${element.is} value=""></${element.is}>`,
                props : []
            };

            let fnExcutor = fnExcute.bind(eleObj);

            //Common
            fnExcutor(anaylzedDataHandler.is, element.is);
            fnExcutor(anaylzedDataHandler.desc, stringEscape(element.desc));

            //Properties
            element.properties.forEach((p) => {
                //Properties Type이 getter 또는 Function이 아닐 때
                if (p.type === "" || p.type === 'Function') {

                } else if (CONFIG.mode === MODE.ALL) {
                    eleObj.props.push({name: p.name});

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
}

//if first parameter is function excute
//The arrow function does not create its own this
function fnExcute(fn, ...args) {
    if (_.isFunction(fn)) {
        return fn.apply(this, args);
    }
    return undefined;
}

//Code Snippet Config Handler
var anaylzedDataHandler = {
    is: function (value) {
        this.is = value;
    },
    desc: function (value) {
        this.desc = value;
    }
}

//Change Special Character
function htmlEscape(templateData) {
    var s = "";
    for (var i = 0; i < arguments[0].length; i++) {
        var arg = String(arguments[0][i]);

        // 대입문의 특수 문자들을 이스케이프시켜 표현합니다.
        s += stringEscape(arg);

        // 템플릿의 특수 문자들은 이스케이프시키지 않습니다.
        if (arguments[i + 1]) {
            s += arguments[i + 1];
        }

    }
    return s;
}

//String escape
function stringEscape(str) {
    if(typeof str !== "string") {
        return "";
    }

    return str.replace(/&/g, '&amp;') // first!
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;')
        .replace(/\n/g, '&#10;  ');
}