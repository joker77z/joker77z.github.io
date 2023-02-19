---
date: '2023-02-17'
title: '크롬 익스텐션 공식문서 번역'
categories: ['Dev']
summary: 'Extensions101, Development basics, Reading Time 읽어보기'
thumbnail: '../images/image-20230101171834438.png'
---



> Chrome Developers > Extensions > Getting Started Guides에 있는 내용들을 번역하며 크롬 익스텐션 제작 기본기를 익혀보자.

## Extensions101

이 페이지에서 Extension이 무엇이고 어떤 것을 제공할 수 있는지 설명한다. 그리고 beginner tutorial 링크를 포함한다.

### Extensions가 무엇인가?

크롬 익스텐션은 크롬 브라우저에 기능을 추가해 다음과 같은 기능을 제공함으로서 브라우징 경험을 향상시킨다.

- 생산성 도구
- 웹 페이지 콘텐츠 강화
- 정보 수집

이 것들은 익스텐션이 할 수 있는 많은 것들 중 일부분이다. 수천개의 공개된 익스텐션 예제를 크롬 웹 스토어에서 볼 수 있다.

### Web technologies

Extensions는 웹 어플리케이션을 만드는데 사용되는 기술과 동일한 웹 기술이 쓰인다.

### Chrome extension APIs

익스텐션은 브라우저가 제공하는 모든 Javascript API들을 이용할 수 있다. 익스텐션을 웹 앱보다 더 강력하게 만들어주는 것은 Chrome APIs에 대한 접근성이다. 다음은 익스텐션 기능의 몇 가지 예다.

- 웹 사이트의 기능이나 동작을 변경할 수 있다.
- 사용자가 웹사이트 간 정보를 수집하고 구성할 수 있다.
- Chrome DevTools에 기능을 추가할 수 있다.

[API 리스트들을 확인할 수 있다.](https://developer.chrome.com/docs/extensions/mv3/devguide/)

### Extension files

제공하는 기능에 따라 포함하는 파일 종류들이 다르다. 자주 사용되는 파일들은 다음과 같다.

- The manifest

  minifest는 manifest라는 파일명을 가진 manifest.json파일이 반드시 있어야 한다. 그리고 익스텐션 파일 root에 위치해야 한다. manifest는 중요한 메타데이터를 기록하고 리소스를 정의하며, 사용 권한을 선언하고, 백그라운드와 배경에서 실행할 파일을 식별한다.

- The service worker

  service worker는 브라우저 이벤트를 처리하고 수신한다. 새 페이지로 이동하거나 북마크를 제거하거나 탭을 닫는 등 많은 유형 이벤트가 있다. 이는 Chrome API를 사용해서 가능하다. 하지만, 이것은 웹 페이지의 콘텐츠와는 직접 상호작용할 수 없다. 그것은 콘텐츠 스크립트의 작업이다.

- Content scripts

  Content scripts는 웹 페이지의 컨텍스트에서 Javascript를 실행한다. 그것은 또한 주입되는 페이지의 DOM을 읽거나 수정할 수 있다. Content script는 Chrome API의 하위 집합만 사용할 수 있지만, 나머지 부분은 extension service worker와 메시지를 교환해서 간접적으로 액세스 할 수 있다.

- The popup and other pages

  팝업이나 옵션페이지, 기타페이지 같은 다양한 HTML파일을 포함할 수 있다.

[익스텐션 파일 구조](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/), [UI 디자인](https://developer.chrome.com/docs/extensions/mv3/user_interface/)을 참고할 수 있다.

> **익스텐션은 모두 팝업으로 만들어야 하는가?**
>
> 많은 익스텐션이 유저가 커스터마이즈 할 수 있는 팝업을 사용하지만, 필수는 아니다. 예를 들어 [reading time](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/)과 [focus mode](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-focus-mode/) 확장 튜토리얼은 팝업을 사용하지 않는다.

### extension 개발하기

웹 어플리케이션과 익스텐션은 많은 같은 기술들을 공유하지만, 익스텐션 개발 경험은 다르다. [Development Basics](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)를 확인하여 "Hello Extensions" 예제를 작성하고 익스텐션 개발 워크플로우에 익숙해지자.

### extension 기능 설계

단일 목적을 만족해서 좁게 정의하고 이해하기 쉽게 디자인 해야 한다. 이렇게 해야 배포할 수 있다. 단일 목적이란 좁은 범위의 주제를 정하는 것이다. 뉴스 헤더라인, 날씨, 쇼핑 비교 같이. 익스텐션 목적과 상관없이 설정 그리고 선호도를 존중해야 한다.

### extension 배포하기

Chrome Web Store에서 개발자 계정을 사용하여 설정하고 호스팅하거나 배포할 수 있다. 익스텐션은 [개발자 프로그램 정책](https://developer.chrome.com/docs/webstore/program-policies/)을 준수해야 한다. [배포 하는방법](https://developer.chrome.com/docs/webstore/publish/)을 통해 배포하는 방법을 배울 수 있다.

> **조직 내에서만 배포하는 방법은?**
> [기업 배포 옵션](https://developer.chrome.com/docs/webstore/cws-enterprise/)을 참고하자.



## Development basics

크롬 익스텐션 개발의 기본을 배워보자.

### 개요

익스텐션 개발과정을 설명한다. 우리는  "Hello, Extensions" 예제를 만들고 로컬에서 익스텐션 로드하고, 로그를 찾고 다른 권장사항을 살펴본다.

### Hello Extensions

이 익스텐션은 익스텐션 툴바 아이콘을 유저가 클릭했을 때 "Hello Extensions"를 보여줄 것이다.

새 디렉터리를 만드는 것부터 시작한다. 만약 너가 모든 소스를 다운로드하기를 원한다면 [깃헙](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.hello-world)에서 받을 수 있다.

다음으로, 디렉토리안에 새 파일을 만든다. 파일이름은 `manifest.json`으로 만들고 다음 코드를 입력한다.

```json
{
  "manifest_version": 3,
  "name": "Hello Extensions",
  "description": "Base Level Extension",
  "version": "1.0",
  "action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  }
}
```

이 JSON 파일이 익스텐션의 기능과 구성을 설명한다. 예를 들어 action키는 icon 이미지와 클릭했을 때 나오는 html파일을 선언하고 있다. [아이콘 이미지](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#:~:text=action%20is%20clicked.-,Download%20the%20icon,-to%20your%20directory)를 디렉토리에 다운받고 default_icon과 이름을 맞춰주자.

popup을 위해서 hello.html파일을 만들고 다음 코드를 작성하자.

```html
<html>
  <body>
    <h1>Hello Extensions</h1>
  </body>
</html>
```

이제 툴바 아이콘을 클릭하면 팝업에서 보인다. 자 이제 크롬에서 테스트해보자.

### 압축해제된 익스텐션 로드하기

개발자 모드에서 압축해제된 익스텐션을 로드하려면 다음과 같이 한다.

1. `chrome://extensions`로 이동한다.
2. 우측 상단에 개발자 모드 토글을 온한다.
3. `Load unpacked` 버튼을 클릭해서 만든 익스텐션 디렉토리를 오픈한다.

완료!

### 익스텐션 리로드

manifest파일을 수정했을 때는 reload버튼으로 바로 반영할 수 있다.

![Reload an extension](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/4Ph3qL9aUyswxmhauRFB.png?auto=format)

> **변경 내용을 보기 위해 항상 새로고침을 눌러야 할까?**
> 그렇지 않다. 
>
> | Extension component        | Requires extension reload |
> | -------------------------- | :-----------------------: |
> | The manifest               |            Yes            |
> | Service worker             |            Yes            |
> | Content Scripts            | Yes (plus the host page)  |
> | The popup                  |            No             |
> | Options page               |            No             |
> | Other extension HTML pages |            No             |

### console.logs와 errors

console.log는 팝업 우측을 눌러서 개발자 도구에 진입한 뒤 확인할 수 있다.

![Inspecting the popup](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/vHGHW1o4J0kZgUkAteRQ.png?auto=format)



만약, 신텍스 에러가 있다면 익스텐션 목록에서 Errors를 확인할 수 있다.

![Extensions page with error button](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/a9lAHCJZZrebOSKrkPRD.png?auto=format)

### 익스텐션 프로젝트 구조

많은 익스텐션 구조가 있지만, manifest.json파일은 루트에 있어야 한다. 아래는 예시 구조다.

![The contents of an extension folder: manifest.json, background.js, scripts folder, popup folder, and images folder.](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/hjccQNanPjTDpIajkhPU.png?auto=format)

### 타입스크립트 사용하기

만약, 코드에디터로 개발한다면, npm 패키지인 chrome-types를 받아 Chrome API에 대해 자동완성을 시킬 수 있다. 이 npm 패키지는 크로미윰 소스코드가 바뀐다면 자동으로 업데이트 된다.

## Reading time

페이지에 Element를 추가하는 익스텐션을 만들어보자.

### Build the Extension

#### 1. 익스텐션에 관한 정보 추가

```json
{
  "manifest_version": 3,
  "name": "Reading time",
  "version": "1.0",
  "description": "Add the reading time to Chrome Extension documentation articles"
}
```



#### 2. 아이콘

아이콘은 옵션이지만, 크롬 웹 스토어에 배포하려는 경우 필요하다. 또한 익스텐션 페이지와 같은 다른 페이지에도 나타난다. SVG를 제외한 다른 아이콘들을 지원하지만 PNG를 쓰는 것이 좋다고 한다.

```json
{
  ...
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
  ...
}
```

> **크기별 아이콘이 쓰이는 곳**
>
> | Icon size | Icon use                                                |
> | --------- | ------------------------------------------------------- |
> | 16x16     | Favicon on the extension's pages and context menu icon. |
> | 32x32     | Windows computers often require this size.              |
> | 48x48     | Displays on the Extensions page.                        |
> | 128x128   | Displays on installation and in the Chrome Web Store.   |



#### 3. Content Script 선언

익스텐션은 페이지의 내용을 읽고 수정하는 스크립트를 실행할 수 있다. 이런 스크립트를 Content Script라고 한다. 

```json
{
  ...
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": [
        "https://developer.chrome.com/docs/extensions/*",
        "https://developer.chrome.com/docs/webstore/*"
      ]
    }
  ]
}
```

matches 필드를 사용하면 특정 url에서만 content scripts파일이 실행되도록 할 수 있다.

> **유저가 익스텐션을 받을 때 경고**
> 이 예제에서는 아래와 같은 경고를 보게 될 것이다.
>
> ![Permission warning the user will see when installing the Reading time extension](https://wd.imgix.net/image/BhuKGJaIeLNPW9ehns59NfwqKxF2/rKDdOyri9x8VkhTEXbO6.png?auto=format)



#### 4.읽는 시간을 계산하고 삽입하기

```js
const article = document.querySelector('article');

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement('p');
  // Use the same styling as the publish information in an article's header
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector('h1');
  // Support for article docs with date
  const date = article.querySelector('time')?.parentNode;

  (date ?? heading).insertAdjacentElement('afterend', badge);
}
```



