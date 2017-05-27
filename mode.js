/**
 * Created by JongHyeok Choi on 2017. 5. 28..
 */

module.exports = {
    //공통적으로 Function, Getter 제외

    ALL: 1, //모든 Property에 대해
    EXIST_ANNOTATION: 2, //Annotation이 있는 태그에 대해
    EXIST_DESC: 3,  //Comment가 존재하는 경우
    CUSTOM_ANNOTATION: 4 //특정 어노테이션이 있는 경우
};