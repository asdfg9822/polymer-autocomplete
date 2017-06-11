/**
 * Created by JongHyeok Choi on 2017. 6. 5..
 */

let _ = require('underscore');

module.exports = {
    /**
     * overwrite Config from behind Parameter.
     * @Param Object
     */
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
    },
    /**
     * Check that the property values of the object correspond to the value passed to the second value factor.
     */
    contains(objArr, value, func) {
        return objArr.some(obj => func.call(null, obj) === value);
    },
    /**
     * Check that the property values of the object corresponsd to the value passed to the second value array factor
     */
    containsByValArr(objArr, valueArr, func) {
        return valueArr.some(value => this.contains(objArr, value, func));
    },
}