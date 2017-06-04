/**
 * Created by JongHyeok Choi on 2017. 6. 3..
 */

/**
 * Define Comman Line Option
 */
const commandLineArgs = require('command-line-args'); //Argv Handler
const getUsage = require('command-line-usage'); //Usage Generator

const optionDefinitions = [
    { name: 'input', alias: 'i', type: String }, //Input directory path
    { name: 'output', alias: 'o', type: String  }, //Output directory path
    { name: 'extension', alias: 'e', type: RegExp}, //Extension (ex) html
    { name: 'mode', alias: 'm', type: String }, //Property Data Mode
    { name: 'excludes', alias: 'x', type: String, multiple: true }
];
const opts = commandLineArgs(optionDefinitions, { partial: true });

const sections = [
    {
        header: 'Polymer Snippet & Autocomplete Generator',
        content: 'Atom, Sublime, Webstorm, PhpStorm, VS Code'
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'input',
                typeLabel: '[underline]{dir path}',
                description: 'Your custom component input directory path '
            },
            {
                name: 'output',
                typeLabel: '[underline]{dir path}',
                description: 'output config file directory path '
            },
            {
                name: 'extension',
                description: 'File Filtering Extention (Default : .html)'
            },
            {
                name: 'ext',
                description: 'File Filtering Extention (Default : .html)'
            },
            {
                name: 'mode',
                description: 'Property Filtering Mode\n• ALL : 1 \n• EXIST_ANNOTATION : 2 \n• EXIST_DESC : 3 \n• CUSTOM_ANNOTATION : 4\n'
            },
            {
                name: 'help',
                description: 'Print this usage guide.'
            }
        ]
    },
    {
        content: [
            'Made By JongHyeok Choi',
            '@contact : asdfg9822@naver.com',
            `[97m@[39m[97m@[39m[97m@[39m[97m@[39m[97m0[39m[96mC[39m[96mC[39m[96mC[39m[97mG[39m[97m8[39m[97m@[39m[97m@[39m[97m@[39m[97m0[39m[95mL[39m[91mf[39m[91mf[39m[91mf[39m[34mt[39m[97mG[39m[97m@[39m[97m@[39m[97m@[39m[97m@[39m
[97m@[39m[97m@[39m[97m@[39m[97m0[39m[96mL[39m[96mL[39m[96mL[39m[96mC[39m[97m8[39m[97m@[39m[97m@[39m[97m@[39m[97m0[39m[95mL[39m[91mf[39m[91mf[39m[91mt[39m[34mi[39m[34mi[39m[34mi[39m[97mC[39m[97m@[39m[97m@[39m[97m@[39m
[97m@[39m[97m@[39m[97mC[39m[96mf[39m[96mf[39m[96mf[39m[96mC[39m[97m8[39m[97m@[39m[97m@[39m[97m@[39m[97m0[39m[95mL[39m[95mL[39m[95mL[39m[95mC[39m[97mG[39m[34mt[39m[34mi[39m[34mi[39m[94m1[39m[97mC[39m[97m@[39m[97m@[39m
[97m8[39m[96mC[39m[96mf[39m[96mf[39m[96mf[39m[96mC[39m[97m8[39m[97m@[39m[97m@[39m[97m@[39m[97mG[39m[95mC[39m[95mC[39m[95mL[39m[97mC[39m[97m8[39m[97m@[39m[97m8[39m[96mf[39m[94m1[39m[96mt[39m[96mt[39m[96mL[39m[97m8[39m
[97m8[39m[96mL[39m[96mt[39m[96mt[39m[94m1[39m[96mf[39m[97m8[39m[97m@[39m[97m8[39m[97mC[39m[95mL[39m[95mL[39m[95mL[39m[97mG[39m[97m@[39m[97m@[39m[97m@[39m[97m8[39m[96mC[39m[96mf[39m[96mf[39m[96mf[39m[96mC[39m[97m8[39m
[97m@[39m[97m@[39m[97mC[39m[94m1[39m[34mi[39m[34mi[39m[34mt[39m[97mG[39m[95mC[39m[95mL[39m[95mL[39m[95mL[39m[97m0[39m[97m@[39m[97m@[39m[97m@[39m[97m8[39m[96mC[39m[96mf[39m[96mf[39m[96mf[39m[97mC[39m[97m@[39m[97m@[39m
[97m@[39m[97m@[39m[97m@[39m[97mC[39m[34mi[39m[34mi[39m[34mi[39m[91mt[39m[91mf[39m[91mf[39m[95mL[39m[97m0[39m[97m@[39m[97m@[39m[97m@[39m[97m0[39m[96mC[39m[96mL[39m[96mL[39m[96mL[39m[97m0[39m[97m@[39m[97m@[39m[97m@[39m
[97m@[39m[97m@[39m[97m@[39m[97m@[39m[97mG[39m[34mt[39m[91mf[39m[91mf[39m[91mf[39m[95mL[39m[97m0[39m[97m@[39m[97m@[39m[97m@[39m[97m8[39m[97mG[39m[96mC[39m[96mC[39m[96mC[39m[97m0[39m[97m@[39m[97m@[39m[97m@[39m[97m@[39m`
        ],
        raw: true
    }
];

const usage = getUsage(sections);
console.log(usage);

let processedOpts = {};
if(opts.input) {
    processedOpts.input = {
        path: opts.input
    };
}
if(opts.output) {
    processedOpts.output = {
        path: opts.output
    };
}
if(opts.mode) {
    processedOpts.mode = opts.mode;
}
if(opts.extension) {
    processedOpts.input = processedOpts.input || {};
    processedOpts.input.test = opts.extension;
}
if(opts.excludes) {
    processedOpts.input = processedOpts.input || {};
    processedOpts.input.excludes = opts.excludes;
}

module.exports = processedOpts;