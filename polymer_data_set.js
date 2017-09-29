/**
 * Created by JongHyeok Choi on 2017. 5. 23..
 */

"use strict"

const {Analyzer, FSUrlLoader} = require('polymer-analyzer');
const _ = require('underscore');
const fs = require('fs');
const lineColumn = require('line-column');

/**
 * Custom Module
 */
const UTIL = require('./lib/util.js');
const MODE = require('./lib/mode.js');
const CaseMap = require('./lib/case-map.js');

/**
 * (Required) Package Root Path
 */
let analyzer = new Analyzer({
    urlLoader: new FSUrlLoader('./'),
});

/**
 * Generate Data for Template
 */
module.exports = function (path, id) {
    const CONFIG = this;
    return new Promise((resolve, reject) => {
        analyzer.analyze([path]).then((analysis) => {
            const [element,] = analysis.getFeatures(
                {kind: 'element', id: id, externalPackages: true});

            if (element) {
                /**
                 * [Element Object Example]
                 * let eleObj = {
                    is: "element-id",
                    desc: "element-desc",
                    props: [
                        {
                            name: "property-name",
                            desc: "property-desc",
                            type: "property-type",
                            valueList: [
                                {value: "value-1", desc: "desc-1"},
                                {value: "value-2", desc: "desc-2"},
                                {value: "value-3", desc: "desc-3"}
                            ]
                        }
                    ],
                    methods: [
                        {name: "function-name", content: "function-content", desc: "function-desc"},
                        {name: "function-name2", content: "function-content2", desc: "function-desc2"}
                    ]
                }*/

                let eleObj = {
                    is: id, //polymer id
                    props: [],  //property
                    desc: element.description, //description
                    methods: [] //method
                };

                //name : event name, property : event info object
                for(const [name, event] of element.events) {

                    let jsdoc = event.jsdoc;
                    //Event Base Obj
                    let eventObj = {
                        //ex) response -> on-response
                        name: `on-${name}`,

                        //jsdoc Y -> Event , N -> notify
                        desc: stringEscape(
                            (jsdoc &&  jsdoc.description) ?
                                jsdoc.description : element.properties.get(CaseMap.getPropNameByEvent(name)).description
                        ),

                        type: "event",

                        //value : response -> onResponse
                        //desc : response 이벤트가 반생하면 실행되는 콜백함수를 등록하세요.
                        valueList: [{
                            value: `on${name.charAt(0).toUpperCase() + CaseMap.dashToCamelCase(name).slice(1)}`,
                            desc: `'${name}' 이벤트가 발생하면 실행되는 콜백함수를 등록하세요.`
                        }]
                    };

                    eleObj.props.push(eventObj);
                }

                //name : property name, property : property info object
                for (const [name, property] of element.properties) {

                    let jsdoc = property.jsdoc;

                    //Value Input
                    let valueList = [];
                    if(jsdoc.tags && jsdoc.tags.length > 0) {
                        jsdoc.tags.forEach(tag => {
                            //You can custom setting using autocomplete.config.js value_annotation
                            if(tag.title == CONFIG.value_annotation) {
                                let tagSplit = tag.description.split(":");
                                let tagValue = tagSplit[0] || "";
                                let tagDesc  = tagSplit[1] || "";

                                valueList.push({
                                    value: tagValue,
                                    desc: tagDesc
                                });
                            }
                        });
                    }

                    //Property Base Obj
                    let propObj = {
                        name: name,
                        propName: name,
                        desc: stringEscape(property.description) ||  "",
                        valueList: valueList,
                        type: property.type || ""
                    };

                    //If property type is 'Function', and continue next property.
                    if(property.type === "Function") {
                        continue;
                    }

                    //Reference File ->  ./lib/mode.js
                    if (CONFIG.mode === MODE.ALL) {
                        eleObj.props.push(propObj);

                    } else if(property.privacy === "public") {

                        if (CONFIG.mode === MODE.PUBLIC) {
                            eleObj.props.push(propObj)
                        } else if (CONFIG.mode === MODE.EXIST_ANNOTATION && jsdoc.tags && jsdoc.tags.length > 0) {
                            eleObj.props.push(propObj)
                        } else if (CONFIG.mode === MODE.EXIST_DESC && property.description) {
                            eleObj.props.push(propObj)
                        } else if (CONFIG.mode === MODE.CUSTOM_ANNOTATION && jsdoc.tags && jsdoc.tags.length > 0 && (UTIL.containsByValArr(jsdoc.tags, CONFIG.custom_annotations, obj => obj.title))) {
                            eleObj.props.push(propObj)
                        }
                    }
                }

                //name : method name, method : method info object
                for (const [name, method] of element.methods) {
                    let methodObj = {
                        name: name,
                        methodName: name,
                        content: "",
                        desc: "",
                        params: []
                    };

                    //Element own method
                    if(element.inheritedFrom) {


                        eleObj.methods.push(methodObj);
                    }
                    //Inherited Method
                    else {

                        let fileSource = fs.readFileSync(method.sourceRange.file, 'utf8');

                        methodObj.content = getFunctionString(fileSource, method.sourceRange.start, method.sourceRange.end);
                        methodObj.desc = method.description || "";

                        method.params.forEach((param) => {
                            methodObj.params.push({
                                name: param.name,
                                paramName: param.name,
                                type: param.type || "입력",
                                desc: param.description || "입력"
                            });
                        });

                        eleObj.methods.push(methodObj);
                    }
                }

                resolve([eleObj]);

            } else {
                console.warn(`[${id}.html] didn't define.`);
                resolve([]);
            }
        });
    });
};

//String escape
function stringEscape(str) {
    if (typeof str !== "string") {
        return "";
    }

    return JSON.stringify(str.replace(/&/g, '&amp;') // first!
        .replace(/>/g, '\>')
        .replace(/</g, '\<')
        .replace(/"/g, '\\"')
        .replace(/'/g, '\'')
        .replace(/:/g, '\:')
        .replace(/\n/g, '')
        .replace(/`/g, '\`'));
}

function getFunctionString(str, startObj, endObj) {
    let startIdx = lineColumn(str).toIndex({line: startObj.line + 1 , column: startObj.column + 1});
    let endIdx = lineColumn(str).toIndex({line: endObj.line + 1, column: endObj.column + 1});

    return str.substr(startIdx, endIdx-startIdx);
}