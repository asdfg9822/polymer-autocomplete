/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (obj) =>
{
    return `<templateSet group="MySnippet">
    <template name="example" description="${obj.test}"/>
</templateSet>`;
}