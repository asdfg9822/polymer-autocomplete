/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (elements) =>
{

let template =
`<templateSet group="MySnippet">
    ${elements.map(element =>
    `<template name="&lt;${element.is}&gt;" description="${element.desc}" value="${element.value}">
        <variable name="info" expression="" defaultValue="&quot;info&quot;" alwaysStopAt="true" />
        <context>
          <option name="OTHER" value="true" />
        </context>
    </template>`
    ).join('\n\t')}
</templateSet>`;


    return template;
}