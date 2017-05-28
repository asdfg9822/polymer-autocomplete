/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = (obj) =>
{
    return `".text.html":
  "iron ajax":
    "prefix": "iron-ajax"
    "body": """
    <iron-ajax
      \${1:auto}
      url="${2}"
      handle-as="\${3:json}"
      on-response="\${4:handleResponse}"></iron-ajax>
    $0
    """`;
}