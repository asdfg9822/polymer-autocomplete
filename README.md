# polymer-autocomplete
Polymer Snippet & Auto-complete using polymer-analyzer

### Status
- It it not yet usable, and currently only allows basic Snippet and Auto Complete.

### Editor Setting
(1) Atom 
 - excute node
 - change completions.json
 - change provider.coffee (line:140) 
 
if @completions.attributes[attribute]).global 
--> if (@completions.attributes[tag + "/" +attribute] || @completions.attributes[attribute]).global) 
 - atom restart
 
### Attribute Deploy Mode (in /lib/mode.js)
- ALL
- PUBLIC
- EXIST_ANNOTATION
- EXIST_DESC
- CUSTOM_ANNOTATION

### Supported Editor (Not yet)
- Atom --> in Progress
- Webstorm(Phpstorm)
- Brackets
- VS Code
- Sublime

