---
date: '2023-05-18'
title: '회사에서 chrome extension 제작기'
categories: ['troubleShooting']
summary: 'Chrome Extension으로 업무 효율성을 올려보자.'
thumbnail: '../images/image-20230101171834438.png'
---

## 문제

개발 후 검증할 때 다양한 계약에 따라 많은 도메인에 접속해서 검증을 해야 한다.

이 때 다양한 문제가 있었다.

1. 너무 오랜만에 접속한 도메인은 비밀번호 변경을 요청하는 모달이 뜨는데, 비밀번호를 변경하지 않으면 현재 페이지를 건너뛸 수 없게끔 설정 되어있다. (원래는 해당 DOM요소를 지우고 다음 페이지로 건너뛸 수 있었으나 보안 심사에 의해 막혔다.) 따라서 비밀번호 연장을 해야만 하는 상황이었다. 하지만, 여러 부서에서 사용하고 있는 테스트 도메인 특성상 내 마음대로 비밀번호를 바꿀수도 없었다.
2. 개발 후 확인하기 위한 페이지로 갈 때까지 로그인 모달, 공지 모달 등을 매번 종료하면서 넘어가야 한다.
3. 역량검사라는 서비스가 있는데, 테스트 데이터를 위해서 매번 몇 시간을 투자하면서 검사를 볼 수도 없는 노릇이였다.

위와 같은 문제점들은 기획, QA, 개발부서 모두가 공통으로 겪고 있는 문제였고 불필요한 시간을 소모하고 있었다. 이를 해결해보고자 회사에서 사용할 Chrome Extension을 개발해보기로 마음먹었다. 만약 유용하다는 것이 검증된다면 버전 관리를 통해 점점 develop시키고 싶었다.

## 기능 요구사항

위 문제점들을 토대로 구현해야 하는 기능을 정리해봤다.

- [공통] PR 도메인에서는 Chrome Extension이 동작하지 않아야 한다.
- [공통] 간단하지만, 항상 유지되었으면 하는 기능들을 토글로 만들어서 ON으로 설정 시 앞으로 브라우저를 킬 때 항상 ON으로 상태유지가 되어야 한다. 또한, 브라우저 특정 탭에서 특정 기능을 ON으로 설정했을 때 다른 탭에서도 동작해야 한다.
- 비밀번호 연장 기능 : 비밀번호 변경 요청 모달이 뜰 경우, 자동으로 비밀번호 연장 API를 쏜다.
- 모달 OFF 기능 : 로그인 모달, 공지 모달 등 검증에 불필요한 요소들을 제거한다.
- 데이터 추가 기능 : 토글이 아닌 버튼으로 제공하며, 특정 공고 안에서 지원한 선택한 지원자들 혹은 전체 지원자들에 대해 역량검사 데이터를 추가할 수 있게 한다.

## 기본적인 세팅 : manifest.json

가장 먼저 해야할 것은 manifest.json 설정이다. chrome extension의 설정파일이라고 보면 된다. 크롬 익스텐션의 API들을 사용할 버전, 이름, 버전, 설명, html페이지, 권한, 특정 url에서 실행할 js파일 등을 설정할 수 있다.

**초기에 작성한 manifest.json 파일의 형태**

```json
// manifest.json

{
  "manifest_version": 3,
  "name": "Jobflex Extension", // extension 이름
  "version": "1.0", // extension 버전
  "description": "개발 및 검증 시 반복되는 비밀번호 연장모달, 로그인기록 모달, 공지 모달 등을 on, off할 수 있습니다.", // extension 간략 설명
  "action": {
    "default_popup": "popup.html" // extension 아이콘 클릭 시 열리는 페이지
  },
  "permissions": ["storage", "tabs"], // chrome에서 제공하고있는 메서드를 실행하기 위해 필요한 권한
  "background": {
    "service_worker": "js/background.js" // 이번에 사용하지는 않았지만, 확장 프로그램이 설치되면 항상 실행되고 있다. 웹페이지와 상호작용할 수 없고, 콘텐츠 스크립트와 통신해서 메시지 전달, 데이터 저장, API 호출 등을 한다.
  },
  "icons": { // 브라우저가 알아서 크기를 조정한다.
    "16": "icons/jobflex.png",
    "32": "icons/jobflex.png",
    "48": "icons/jobflex.png",
    "128": "icons/jobflex.png"
  },
  "content_scripts": [ // 웹 페이지와 상호작용할 javascript를 정의한다.
    {
      "matches": [ // js파일이 동작할 수 있는 url을 지정할 수 있다.
        "<http://demo01-cms-recruiter-co-kr.kr-dv-midasitwebsol.com:3000/cus/selectProduct>",
        "<https://demo01-cms-recruiter-co-kr.kr-dv-midasitwebsol.com/cus/selectProduct>",
				...,
      ],
      "js": ["js/selectProduct.js"],
      "run_at": "document_start" // 가장 먼저 실행되게 하거나 가장 늦게 실행되게 할 수 있다.
    },
    {
      "matches": [
        "<http://demo01-cms-recruiter-co-kr.kr-dv-midasitwebsol.com:3000/mrs2/manager/dashboard>",
        "<https://demo01-cms-recruiter-co-kr.kr-dv-midasitwebsol.com/mrs2/manager/dashboard>",
        ...
      ],
      "js": ["js/dashboard.js"],
      "run_at": "document_start"
    }
  ]
}
```

초기에 작성한 코드의 경우를 보면 content_scripts 부분에서 특정 js파일을 특정 url에서 실행시키기 위해 파일마다 url들을 지정해주고 있는 모습이다. 이렇게 한 이유는 2가지 였다.

- Chrome Extension 사용을 허락받기 위해서 정보보호 팀에게 어필할 때 특정 url에서만 content script파일이 동작한다는 것을 알리기 위함.
- 특정 Url에서만 동작한다는 것은 다른 페이지에서는 해당 js파일이 로드조차 되지 않기 때문에 성능, 동작에 영향을 줄 가능성이 제로에 수렴한다는 신뢰성을 줄 수 있다.

하지만, 계속해서 여러 페이지가 추가된다면 얻는 이점보다 불편함이 더 컸기 때문에 manifest.json파일에서 정규식으로 필터링하거나 manifest.json파일에서는 와일드카드를 사용해서 모든 url에서 접근 가능하게 한 후 content script파일 내에서 특정 url에서만 실행 가능하게 변경을 시도했다.

**효과적으로 content script 파일을 추가하기 위한 노력**

위에서 간단하게 설명한 것처럼 manifest.json 파일에서 matches에 정규식 같은 문법이 사용 가능하다면 가장 베스트지만, 불가능하다면 모든 url에 대해 열어준 뒤 content script 파일에서 제어해야 한다.

첫번째 시도로, manifest.json파일의 matches에서 제어해보려고 시도해보았다. 정규식은 아니더라도 와일드카드를 이용할 수 있었다. 공식문서에 따르면 url 중 도메인에 와일드 카드를 넣으려면 바로 앞은 `/`여야 하고 바로 뒤는 `.`이어야 한다. 따라서, st 도메인이나 qa도메인을 지정할 때 `https://st-*.midasweb.net` 이런 식으로 사용이 불가능하고, `https://*.midasweb.net` 이런 식으로 사용해야 했다. 결국 내가 원하는 도메인들에서만 실행 가능하게 할 수 없었다. 따라서, 내가 원하는 특정 도메인들에서만 동작하게 하는 것은 불가능 했다.

두번째 시도로, 아래 manifest.json파일처럼 모든 url에서 content script파일에 접근할 수 있도록 열어주고 content script파일에서 제어를 시도했다.

1. manifest.json 파일에서는 모든 url을 열어줬다.

```json
// manifest.json

{
  ...
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["js/pages/selectProduct.js"],
      "run_at": "document_start"
    },
    {
      "matches": ["<all_urls>"],
      "js": ["js/pages/dashboard.js"],
      "run_at": "document_start"
    },
    {
      "matches": ["<all_urls>"],
      "js": ["js/pages/accGrid.js"],
      "css": ["css/common.css"],
      "run_at": "document_start"
    }
  ]
}
```

2. content script파일 내부에서 처리한다. 만약, 설정해놓은 도메인 중에서 현재 도메인이 포함되어있지 않다면 return false처리해서 해당 content script파일이 실행되지 않도록 했다.

```js
// js/pages/selectProduct.js
(async () => {
  const src = chrome.runtime.getURL("js/helper/common.js");
  const commonScript = await import(src);

  commonScript.matchUrlToRun("/cus/selectProduct")
    ? console.log("%c [Jobflex Extension] 제품선택 페이지 정상 진입", "color: white; background: #00C17C; padding: 10px;")
    : "";

  if (!commonScript.matchUrlToRun("/cus/selectProduct")) {
    return false;
  }

  ...
}();
```

이 때 모듈화한 js/helper/common.js 파일에서 matchUrlToRun 함수를 읽어온 것을 알 수 있다. 모든 content script파일에서 사용할 공통 모듈 js파일을 만든 것이다. 내부적으로는 아래와 같다.

```js
function matchUrlToRun(path) {
  const domainList = [
    "http://demo01-cms-recruiter-co-kr.kr-dv-midasitwebsol.com:3000",
    ...
  ];

  const includePathDomain = domainList.map((domain) => domain + path);
  let currentUrl = window.location.href;

  // 맨 뒤에 #이 붙는 경우가 있음.
  if (currentUrl.slice(-1) === "#") {
    currentUrl = currentUrl.slice(0, currentUrl.indexOf("#"));
  }

  if (includePathDomain.includes(currentUrl)) {
    return true;
  } else {
    return false;
  }
}

export { matchUrlToRun }; // default export은 되지 않는다. named export만 된다.
```

공통 모듈을 사용하기 위해서 manifest.json 파일에 `web_accessible_resources`를 추가하면 된다.

```js
// manifest.json

...
"web_accessible_resources": [
    {
      "matches": ["<all_urls>"],
      "resources": ["js/helper/common.js"]
    }
  ],
  ...
```
