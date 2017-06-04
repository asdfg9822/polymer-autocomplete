/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (elements) =>
{
    let template =
    `    '.text.html.basic':
${elements.map(element =>
        `            '${element.is}':
                'prefix': '${element.is}'
                'body': '<${element.is} class="widget-title"></${element.is}>'
                'description': '${element.desc}'
                'descriptionMoreURL': 'http://hongkiat.com'`
        ).join('\n')}`;

    return template;
}