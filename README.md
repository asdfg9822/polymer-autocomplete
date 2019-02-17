# polymer-autocomplete
Polymer Snippet & Auto-complete using [polymer-analyzer](https://github.com/Polymer/polymer-analyzer)

## Status
- Atom usable [DEMO Video](https://youtu.be/e4ij8Fg51hM)
- Brackets usable, but description does not exist.
- The rest editor not yet usable, and currently only allows basic Snippet and Auto Complete.

## Supported Editor (Not yet)
- Atom --> Complete
- Brackets --> Complete
- VS Code --> Complete
- Webstorm(Phpstorm) --> Not Supported
- Sublime

## Using
(*) Common
 - Clone project & change directory

        $ git clone https://github.com/asdfg9822/polymer-autocomplete.git
        $ cd ./polymer-autocomplete

 - Install npm dependencies

        $ npm install

 - Set your config (Mode, Input/Output Directory, Excludes..)

    [Config File Setting](#config-file-setting-autocompleteconfigjs)

 - Excute Node

        $ node main.js

 - Check output

(1) Atom
 - install atom autocomplete-html package
 - change completions.json
 - change provider.coffee (_atom_/provider.coffee)
 - restart atom

(2) Brackets
 - change /Applications/Brackets.app/Contents/www/extensions/default/HTMLCodeHints/HtmlTags.json
 - change /Applications/Brackets.app/Contents/www/extensions/default/HTMLCodeHints/HtmlAttributes.json
 - restart brackets
 
(3) VSCode


## Attribute Deploy Mode (in /lib/mode.js)
- *ALL*
- *PUBLIC*
- *EXIST_ANNOTATION*
- *EXIST_DESC*
- *CUSTOM_ANNOTATION*

## Config File Setting (autocomplete.config.js)
The setting has the following priority :
- *Main* Config < *Deploy* Config < *User CLI* Config
```javascript
/**
 * Your Version 1 Config
 */
const verConfig1 = {
    input: {
        path: './input', //Get Path
        test: /\.html/,  //Regular Expression for File Extention Check
        excludes: [
            /node_modules/,
            /demo/,
            /test/
        ], //Regular Expression for Exclude Directory
    },
    output: {
        path: './output/PUBLIC'
    },
    mode: MODE.PUBLIC
}

/*...your Configs...*/
/*...your Configs...*/
/*...your Configs...*/

/**
 * Main Config.
 * You can create different outputs per component versions.
 */
const config = {
    context: __dirname + '/app', //__dirname is always the directory in which the currently executing script resides
    mode: MODE.ALL,
    value_annotation: 'value',
    deploy: [
        {"version": "1.0.0", config: verConfig1, output: true},
        // {"version": "1.0.1", config: verConfig2, output: true} //no output example
        // ... deploy configs
    ]
};
```

