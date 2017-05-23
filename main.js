/**
 * Created by user on 2017. 5. 23..
 */

var hyd = require('hydrolysis');

hyd.Analyzer.analyze('./input/test.html')
    .then(function(analyzer) {
        console.log(analyzer.elementsByTagName['test']);
    });