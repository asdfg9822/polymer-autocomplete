/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

const CaseMap = require('../case-map.js');

module.exports = (elements) =>
{

    let template =
`{
    "tags": {
        ${elements.map(element =>
        `"${element.is}": {
          "attributes": [
            ${element.props.map(prop =>  
            `"${CaseMap.camelToDashCase(prop.name)}"`).join(',')}
          ],
          "description": "${element.desc}"
        }`).join(',\n\t')}
    },
    "attributes": {
    
    }
}`;

    return template;

}