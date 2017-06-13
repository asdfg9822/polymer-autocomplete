/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

const CaseMap = require('../../lib/case-map.js');
const _ = require('underscore');

module.exports = (elements) => {

    let template =
        `{
        ${elements.map(element =>
            `"${element.is}": {
          "attributes": [
            ${element.props.map(prop =>
                `"${CaseMap.camelToDashCase(prop.name)}"`).join(',')}
          ],
          "description": "${stringEscape(element.desc)}"
        }`)}
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
    function getValueList(obj) {
        if(_.isArray(obj.valueList)) {
            let valueList = [];
            valueList = obj.valueList.map((valueObj) => {
                return `"${valueObj.value}"`;
            });
            return valueList.join(",");
        }
        return "";
    }

    //Return a list of description of possible values
    function getDescList(obj) {
        if(_.isArray(obj.valueList)) {
            let valueList = [];
            valueList = obj.valueList.map((valueObj) => {
                return `"${valueObj.value.trim()}" : "${valueObj.desc.trim()}"`;
            });
            return valueList.join(",");
        }
        return "";
    }

}