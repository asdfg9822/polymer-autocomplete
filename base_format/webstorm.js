/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (elements) =>
{

let template =
`<templateSet group="webstrom-polymer">
    ${elements.map(element =>
    `<template name="&lt;${element.is}&gt;" value="${element.value}" description="${element.desc}" toReformat="true" toShortenFQNames="true">
        <variable name="selector" expression="" defaultValue="" alwaysStopAt="true" />
        <variable name="info" expression="" defaultValue="&quot;info&quot;" alwaysStopAt="true" />
        <context>
          <option name="OTHER" value="true" />
        </context>
    </template>`
    ).join('\n\t')}
    <template name="polymer" value="&lt;dom-module id=&quot;$filename$&quot;&gt;&#10;  &lt;style&gt;&#10;    :host {&#10;        @apply(--vbox-layout);&#10;    }&#10;  &lt;/style&gt;&#10;  &lt;template&gt;&#10;    &#10;    &#10;  &lt;/template&gt;&#10;  &lt;script&gt;&#10;    Polymer({&#10;      is: '$filename$'&#10;    });&#10;  &lt;/script&gt;&#10;&lt;/dom-module&gt;" description="polymer element, external styles" toReformat="true" toShortenFQNames="true">
        <variable name="filename" expression="fileNameWithoutExtension()" defaultValue="" alwaysStopAt="true" />
        <variable name="selector" expression="" defaultValue="" alwaysStopAt="true" />
        <context>
          <option name="OTHER" value="true" />
        </context>
    </template>
</templateSet>`;

    return template;
}