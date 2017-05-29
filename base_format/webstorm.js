/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (elements) =>
{

let template =
`<templateSet group="MySnippet">
    ${elements.map(element =>
    `<template name="&lt;${element.is}&gt;" value="${element.value}" description="${element.desc}">
        <variable name="info" expression="" defaultValue="&quot;info&quot;" alwaysStopAt="true" />
        <context>
          <option name="OTHER" value="true" />
        </context>
    </template>`
    ).join('\n\t')}
</templateSet>`;


    return template;
}