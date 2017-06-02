/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (elements) =>
{
    let template =
`var ok = {
    "tags": {
        ${elements.map(element =>
        `"${element.is}": {
          "attributes": [
            ${element.props.map(prop =>  
            `"${prop.name}"`).join(',')}
          ],
          "description": "${element.desc}"
        },`).join('\n\t')}
    },
    "attributes": {
    
    }
}`;

    return template;
}