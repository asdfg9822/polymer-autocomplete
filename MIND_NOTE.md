# 프로젝트를 하면서 고민되었던 점을 적는다

### 개발 이유
- 프로젝트 별로 Release되는 Component가 있을 수 있기 때문에 CI 환경에서 사용하여 버전별로 Output을 관리하기 위함
- 이 프로그램의 주 목적은 사용자가 자신이 원하는 Property를 만을 볼 수 있도록 Mode 기능(Filter 같은)을 제공하기 위함
- 현재 프로젝트에 Custom Element가 없더라도 자동완성을 제공하기 위함 ( 기존에 현재 프로젝트 폴더를 기준으로 분석하는 시스템이 존재함 )
- Atom, Webstorm, Sublime, Eclipse, Brackets 등 Editor의 AutoComplete Plugin만 존재한다면 활용하기 위함

### 파일 구조
크게 아래와 같이 3종류의 파일로 실행된다.
- main.js : 어떤 파일을 어떻게 읽을 것인가. 어떤 Template을 가지고 새로운 파일을 만들 것인가
- polymer_data_set.js : Polymer v1 Element로 템플릿 생성에 필요한 데이터를 준비
- template files : 위에서 준비한 데이터로 원하는 형태의 데이터로 가공

이렇게 했을 경우 polymer_data_set이 아닌 vue_date_set, polymer_2.0_data_set 등 다른 프레임워크에서 데이터를 만들어주기만 하면
나머지 부분을 공유해서 쓸 수 있기 때문에 조금 더 다양한 언어를 지원할 수 있을 거라 생각한다.

또한, 반대로 polymer_data_set을 가지고 main.js 의 용도를 바꾸는 것도 하나의 방법이다.
이 경우에는 polymer element의 파싱을 그대로 구현할 수 있다는 장점이 있다.

