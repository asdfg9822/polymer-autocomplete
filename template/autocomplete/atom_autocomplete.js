/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

const CaseMap = require('../../lib/case-map.js');
const _ = require('underscore');

module.exports = (elements) => {

    let template =
        `{
    "tags": {
        ${elements.map(element =>
            `"${element.is}": {
          "attributes": [
            ${element.props.map(prop =>
                `"${CaseMap.camelToDashCase(prop.name)}"`).join(',')}
          ],
          "description": "${stringEscape(element.desc)}"
        }`).join(',\n\t\t')}
    },
    "attributes": {
        ${elements.map(element =>

            `${element.props.map(prop => `"${element.is}/${CaseMap.camelToDashCase(prop.name)}": {
          "attribOption": [
            ${attrList2String(prop)}
          ],
          "type": "${prop.type}",
          "description": "${prop.desc}"
        }`).join(',\n\t\t')}`)}
    }
}`;

    return template;

    //String escape for Atom
    function stringEscape(str) {
        if (typeof str !== "string") {
            return "";
        }

        return str//.replace(/&/g, '&amp;') // first!
            //.replace(/>/g, '&gt;')
            //.replace(/</g, '&lt;')
            .replace(/"/g, '\\"')
            //.replace(/'/g, '&#39;')
            //.replace(/`/g, '&#96;')
            .replace(/\n/g, '\\n');
    }

    //Return a list of possible values
    function attrList2String(obj) {
        if(_.isArray(obj.inputList)) {
            let inputList = [];
            inputList = obj.inputList.map((inputVal) => {
                return `"${inputVal}"`;
            });
            return inputList.join(",");
        }
        return "";
    }

}