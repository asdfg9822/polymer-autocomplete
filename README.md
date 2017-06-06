# polymer-snippet
Polymer Snippet using hydrolysis

### Status
- It it not yet usable, and currently only allows basic Snippet and Auto Complete.

### Editor Setting
(1) Atom 
 - excute node
 - change completions.json
 - change provider.coffee (line:140) 
if @completions.attributes[attribute]).global --> if (@completions.attributes[tag + "/" +attribute] || @completions.attributes[attribute]).global) 
 - atom restart

### Supported Editor (Not yet)
- Atom
- Webstorm(Phpstorm)
- Brackets
- VS Code
- Sublime

