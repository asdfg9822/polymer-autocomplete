# polymer-autocomplete
Polymer Snippet & Auto-complete using polymer-analyzer

## Status
- Atom editor usable [DEMO Video](https://youtu.be/e4ij8Fg51hM)
- The rest editor not yet usable, and currently only allows basic Snippet and Auto Complete.

## Supported Editor (Not yet)
- Atom --> Complete
- Webstorm(Phpstorm) --> in Progress
- Brackets
- VS Code
- Sublime

## Editor Setting
(1) Atom
 - git clone https://github.com/asdfg9822/polymer-autocomplete.git
 - npm install
 - Set Input Directory in autocomplete.config.js
 - (Optional) Set Output Directory in autocomplete.config.js
 - node main.js
 - install atom autocomplete-html package
 - change completions.json
 - change provider.coffee (_atom_/provider.coffee)
 - restart atom
 
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
        {"version": "1.0.1", config: verConfig2, output: true} //no output
        // ... deploy configs
    ]
};
```

