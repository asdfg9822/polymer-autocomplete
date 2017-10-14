/**
 * Created by user on 2017. 5. 23..
 */

/**
 * Module
 */
const fs = require('fs');
const _ = require('underscore');

/**
 * Custom Module
 */
const elementAnalyze = require('./polymer_data_set.js');
const CONFIG = require('./autocomplete.config.js');
const USER_CLI = require('./lib/cli.js');
const UTIL = require('./lib/util.js');

/**
 * Editor Snippet Base Template
 */
const webstormTmp = require('./template/base_format/webstorm.js');
const atomTmp = require('./template/base_format/atom.js');

/**
 * Editor Autocomplete Base Template
 */
const atom_autocomplete = require('./template/autocomplete/atom_autocomplete.js');
const brackets_tags_autocomplete = require('./template/autocomplete/brackets_tags_autocomplete.js');
const brackets_attrs_autocomplete = require('./template/autocomplete/brackets_attrs_autocomplete.js');

/**
 * PreProcess
 */
if(USER_CLI.hasOwnProperty("help")) {
    return;
}

/**
 * Main Function Start
 */
(_.isEmpty(USER_CLI) ? CONFIG.deploy : [USER_CLI]).forEach((obj) => {
    // priority common config < deploy config < user cli config
    let config = UTIL.mixinConfig(_.omit(CONFIG, 'deploy'), obj.config, USER_CLI),
        targetPaths = [];

    if (obj.output) {   //autocomplete.config.deploy.output =  True
        console.log(obj.version, "-> input");

        searchDir.call(config, targetPaths, config.input.path);
        writeTemplate.call(config, targetPaths, config.output.path);

    } else {
        console.log(obj.version, "-> output excepted");
    }
});

/**
 * Recursive Search
 */
function searchDir(targetPaths, dir) {
    let files = fs.readdirSync(dir),
        config = this;

    files.forEach(function (file) {
        let path = [dir, file].join('/');
        let stats = fs.statSync(path);

        if (stats.isDirectory()) {
            let isPathValid = config.input.excludes.every(function (exclude) {
                return exclude.test(path) ? false : true;
            });
            if (isPathValid) {
                searchDir.call(config, targetPaths, path);
            }
        } else if (config.input.test.test(path)) {
            targetPaths.push({path: path, id: file.split('.')[0] || "?"});
        }
    });
};

/**
 * Write Snippet & Auto Complete File
 */
function writeTemplate(targetEles, outputDir) {
    let config = this;
    //Target File Paths in Target Directory (config.input.path in autocomplete.config.js)
    let promises = targetEles.map(function (targetEle) {
        return elementAnalyze.call(config, targetEle.path, targetEle.id);
    });

    Promise.all(promises)
        .then((result) => {
            //reuslt is Promise Return Value Array.
            let elementList = [], propElementList = [];
            result.forEach((elements) => {
                elements.forEach((element) => {
                    elementList.push(element);
                    if(element.props && element.props.length > 0) {
                        propElementList.push(element);
                    }
                })
            });

            //Directory exist check
            //if there is no directory, create it
            if(!fs.existsSync(outputDir)) {
                _.reduce(outputDir.split("/"), function (path, curr) {
                    let dirPath = path + "/" + curr;
                    if(!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath);
                    }
                    return dirPath;
                });
            }

            //Template Array iterator
            [
                //Snippet
                // {dataObj: webstormTmp(elementList), filename: "webstorm-polymer.xml"},

                // //Auto Complete
                // {dataObj: brackets_tags_autocomplete(elementList), filename: "HtmlTags.json"},
                // {dataObj: brackets_attrs_autocomplete(elementList), filename: "HtmlAttributes.json"},
                {dataObj: atom_autocomplete(elementList, propElementList), filename: "completions.json"}
            ].forEach((obj) => {
                //Write File
                fs.writeFile(outputDir + '/' + obj.filename, obj.dataObj, (err) => {
                    if (err) throw err;
                    console.log(obj.filename, 'file has been saved!');
                });
            });
        });
};
