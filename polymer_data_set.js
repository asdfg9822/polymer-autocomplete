/**
 * Created by JongHyeok Choi on 2017. 5. 23..
 */

"use strict"

const {Analyzer, FSUrlLoader} = require('polymer-analyzer');
const _ = require('underscore');

/**
 * Custom Module
 */
const MODE = require('./lib/mode.js');
const CONFIG = require('./autocomplete.config.js');

/**
 * (Required) Package Root Path
 */
let analyzer = new Analyzer({
    urlLoader: new FSUrlLoader('./'),
});

/**
 * Generate Data for Template
 */
module.exports = (path, id) => {
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

                    //let message = `${name}`;
                    // if (property.inheritedFrom) {
                    //     message += ` inherited from ${property.inheritedFrom}`;
                    // } else {
                    //     message += ` was defined directly on ${id}`;
                    // }
                    // console.log(message);

                    if (CONFIG.mode === MODE.ALL) {
                        eleObj.props.push({
                            name: name,
                            desc: stringEscape(property.description) ||  "",
                            inputList: ['test1', 'test2']
                        });

                    } else if(property.privacy === "public") {

                        //[Ref] ./lib/mode.js
                        if (CONFIG.mode === MODE.PUBLIC) {
                            eleObj.props.push({
                                name: name,
                                desc: stringEscape(property.description) ||  "",
                                inputList: property.type === "boolean" ? ['true', 'false'] : ['test1', 'test2'],
                                type: property.type || ""
                            });

                        } else if (CONFIG.mode === MODE.EXIST_ANNOTATION) {

                        } else if (CONFIG.mode === MODE.EXIST_DESC) {

                        } else if (CONFIG.mode === MODE.CUSTOM_ANNOTATION) {

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