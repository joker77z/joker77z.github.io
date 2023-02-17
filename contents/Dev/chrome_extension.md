---
date: '2023-02-17'
title: '크롬 익스텐션 만들어보기위한 공식문서 번역-1'
categories: ['Dev']
summary: 'Extensions101, Development basics 읽어보기'
thumbnail: '../images/image-20230101171834438.png'
---



> Chrome Developers > Extensions > Getting Started Guides > Extensions 101 을 번역했다.

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

