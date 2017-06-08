/**
 * Created by JongHyeok Choi on 2017. 5. 23..
 */

"use strict"

const {Analyzer, FSUrlLoader} = require('polymer-analyzer');
const _ = require('underscore');
const UTIL = require('./lib/util.js');

/**
 * Custom Module
 */
const MODE = require('./lib/mode.js');

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
                let eleObj = {
                    is: id, //polymer id
                    props: [],  //property
                    desc: element.description //description
                };

                //name : property name, property : property info object
                for (const [name, property] of element.properties) {

                    let jsdoc = property.jsdoc;

                    //Value Input
                    let inputList = [];
                    if(jsdoc.tags && jsdoc.tags.length > 0) {
                        jsdoc.tags.forEach(tag => {
                            if(tag.title == "value") {
                                inputList = inputList.concat(tag.description.split(","));
                            }
                        });
                    }

                    let propObj = {
                        name: name,
                        desc: stringEscape(property.description) ||  "",
                        inputList: property.type === "boolean" ? ['true', 'false'] : inputList,
                        type: property.type || ""
                    };

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
                        } else if (CONFIG.mode === MODE.CUSTOM_ANNOTATION && jsdoc.tags && jsdoc.tags.length > 0 && (UTIL.contains(jsdoc.tags, CONFIG.custom_annotation, obj => obj.title))) {
                            eleObj.props.push(propObj)
                        }
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

    return str.replace(/&/g, '&amp;') // first!
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;')
        .replace(/\n/g, '&#10;  ');
}