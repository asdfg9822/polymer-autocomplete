/**
 * Created by JongHyeok Choi on 2017. 6. 5..
 */

let _ = require('underscore');

module.exports = {
    //
    mixinConfig(config, ...overwriteConfigs) {

        let mixinObj = _.clone(config);

        for(let i=0, len=overwriteConfigs.length; i<len; i++) {
            let overwriteConfig = overwriteConfigs[i];
            for(let prop in overwriteConfig) {
                if(overwriteConfig.hasOwnProperty(prop)) {
                    mixinObj[prop] = overwriteConfig[prop];
                }
            }
        }

        return mixinObj;
    }
}