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

let analyze = (path) => {
    //Analysis Polymer Element
    hyd.Analyzer.analyze(path)
        .then(settingData);
}

let parser = new xml2js.Parser();
let settingData = (analyzer) => {
    let result = {
        template: [] // Template 태그는 여러 개의 태그를 담는다
    };


    //기본 템플릿 불러오기
    fs.readFile('./format_example/Base.xml', function (err, data) {
        parser.parseString(data, (err, tmp) => {

            //Element별로 처리
            analyzer.elements.forEach((element) => {
                let eleObj = {};

                fnExcute(webstormHandler.is, eleObj, element.is);
                fnExcute(webstormHandler.desc, eleObj, "test");

                element.properties.forEach((p) => {
                    //Properties Type이 getter 또는 Function이 아닐 때
                    if (p.type === "" || p.type === 'Function') {

                    } else if (snippetConfig.mode === MODE.ALL) {
                        console.log(p.name, p.type);



                    } else if (snippetConfig.mode === MODE.EXIST_ANNOTATION) {

                    } else if (snippetConfig.mode === MODE.EXIST_DESC) {

                    } else if (snippetConfig.mode === MODE.CUSTOM_ANNOTATION) {

                    }
                });

                //Push Data
                result.template.push({template: eleObj});

                //JSON to XML
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);

                //Additory Working for Output File
                //Get TemplateSet

                //Write File
                fs.writeFile('./output/Result.xml', xml, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
            });
        });
    });
}

let snippetConfig = {
    get mode() {
        return MODE.ALL;
    },
};

let MODE = {
    //공통적으로 Function, Getter 제외

    ALL: 1, //모든 Property에 대해
    EXIST_ANNOTATION: 2, //Annotation이 있는 태그에 대해
    EXIST_DESC: 3,  //Comment가 존재하는 경우
    CUSTOM_ANNOTATION: 4 //특정 어노테이션이 있는 경우
};

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