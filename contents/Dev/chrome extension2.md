## 아이콘을 눌렀을 때 나오는 html 페이지 : popup.html

Chrome Extension 아이콘을 눌렀을 때 나오는 html 페이지를 만들 순서다.

- 한글을 출력하기 위해 charset속성으로 `UTF-8`을 지정해줬다.
- popup.html페이지의 동작을 정의하고 있는 `popup.mjs`와 util함수들을 정리할 `util.mjs`파일 두개로 나눠서 정리했다. 대부분 브라우저나 Node.js에서 mjs확장자를 사용하지 않아도 모듈 파일로 인식할 수 있지만 모듈로 나눠서 관리하고 있다는 것을 명시적으로 하기 위해 mjs확장자를 사용했다.

```html
<!DOCTYPE >
<html>
  <head>
    <title>Jobflex Extension</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" type="text/css" href="/popup.css" />
    <script src="js/popup.mjs" type="module"></script>
    <script src="js/helper/util.mjs" type="module"></script>
  </head>
  <body class="wave">
    <div id="header" class="inner-header flex">
      <img src="/icons/jobflex.png" />
      <h1>Jobflex Extension 2.0.2</h1>
    </div>

    <!--Waves Container-->
    <!-- <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div> -->
    <!--Waves end-->

    <section class="section acc">
      <h2 class="section-title">응시자 데이터 추가</h2>
      <h3 class="section-description">(역검센터전형 결과 그리드)</h3>
      <div class="control-section">
        <button type="button" id="allPersonAddDataButton">전체 응시자</button>
        <button type="button" id="selectedPersonAddDataButton">선택한 응시자</button>
      </div>
    </section>

    <div class="toggle-container">
      <section class="section">
        <h2 class="section-title">로그인 팝업 OFF</h2>
        <h3 class="section-description">(제품선택)</h3>
        <div class="control-section">
          <input type="checkbox" id="alwaysDontViewLoginHistoryToggle" class="always-checkbox" />
          <label for="alwaysDontViewLoginHistoryToggle" class="toggle-label">
            <div class="toggle-icon"></div>
          </label>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">공지 팝업 OFF</h2>
        <h3 class="section-description">(제품선택, 대시보드)</h3>
        <div class="control-section">
          <input type="checkbox" id="alwaysDontViewPopupToggle" class="always-checkbox" />
          <label for="alwaysDontViewPopupToggle" class="toggle-label">
            <div class="toggle-icon"></div>
          </label>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">비밀번호 연장<span class="section-sub-tag">2달</span></h2>
        <h3 class="section-description">(제품선택)</h3>
        <div class="control-section">
          <input type="checkbox" id="alwaysExtendPasswordToggle" class="always-checkbox" />
          <label for="alwaysExtendPasswordToggle" class="toggle-label">
            <div class="toggle-icon"></div>
          </label>
          <button type="button" id="extendPasswordButton" class="once-button">Once</button>
        </div>
      </section>
    </div>
  </body>
</html>

```



### Chrome Extension 팝업 페이지에서 동작할 기능 정의 : popup.mjs

- `DOMContentLoaded`를 사용해서 popup.html 페이지가 완성된 후에 DOM요소들을 읽을 수 있도록 했다.

- js파일들에서는 오직 id 셀렉터를 사용했다.

  util.js에서 정의한 $함수는 getElementById를 사용하여 DOM요소를 반환하고 있다. id만 읽을 때 querySelector를 사용할 때보다 빨라서 사용했다.

- `storageKeysToElementMap`객체

  - 키와 DOM요소를 매핑시켜뒀다. 이를 이용하여 `chrome.storage.local`에서 해당 key에 어떤 불리언 값이 들어있는지에 따라서 페이지에 있는 toggle들의 ON/OFF상태를 결정한다. 또, DOM요소를 토글할 때 매핑된 key값으로 `chrome.storage.local`에 동적으로 불리언 값을 저장한다.
  - 이 때 코드를 잘 보면 toggle을 on상태로 만들면 `sendMessageToContentScript`함수에 키를 전달하는 것을 볼 수 있다. 현재 탭에서 동작하고 있는 `contentscript.js`파일로 메세지를 전달해서 특정 동작을 하게 할 수 있는데, 이는 이미 페이지로 도착했을 때 토글을 ON한다면 동작하게 하기 위함이다.
  - 만약 페이지에 도착해서 토글을 ON하는 것이 아니라, 다른 페이지에서 토글을 ON해놓은 상태로 동작해야 할 페이지로 진입하게 된다면 `chrome.storage.local`에 저장해놓은 key들을 읽어서 동작을 할 것이다. 이는 뒤에 `contentscript.js`파일에서 이어서 설명한다.

- `sendMessageToContentScript` 함수

  - 현재 활성화된 탭의 id를 받아서 `contentscript.js`파일로 전달하고 응답받은 메세지가 있다면 `window.close()`를 할 수 있도록 했다. 기능을 동작시키고 popup.html을 종료해주는 것인데, 사용자 경험을 고려해서 추가해줬다.

```js
import { $ } from '/js/helper/util.mjs';

window.addEventListener('DOMContentLoaded', () => {
  // Selector
  const $alwaysDontViewLoginHistoryToggle = $(
    'alwaysDontViewLoginHistoryToggle',
  );
  const $alwaysDontViewPopupToggle = $('alwaysDontViewPopupToggle');

  const $alwaysExtendPasswordToggle = $('alwaysExtendPasswordToggle');
  const $extendPasswordButton = $('extendPasswordButton');

  const $allPersonAddDataButton = $('allPersonAddDataButton');
  const $selectedPersonAddDataButton = $('selectedPersonAddDataButton');

  const storageKeysToElementMap = {
    alwaysDontViewLoginHistory: $alwaysDontViewLoginHistoryToggle,
    alwaysDontViewPopup: $alwaysDontViewPopupToggle,
    alwaysExtendPassword: $alwaysExtendPasswordToggle,
  };

  document.getElementById('header').addEventListener('click', () => {
    window.open('https://midasitweb-jira.atlassian.net/wiki/spaces/AATS/pages/3702718544/Jobflex+Chrome+Extension')
  })
  
  /**
   * ToggleRender
   * Toggle을 추가하면 chrome.storage.local.key: dom 형식으로 넣어주면 됌.
   */
  Object.entries(storageKeysToElementMap).forEach(([key, $dom]) => {
    chrome.storage.local.get([key], (result) => {
      $dom.checked = result[key];
    });
  });

  // Event
  Object.entries(storageKeysToElementMap).forEach(([key, $dom]) => {
    $dom.addEventListener('change', (e) => {
      if (e.target.checked) {
        chrome.storage.local.set({ [key]: true });
        sendMessageToContentScript(key);
      } else {
        chrome.storage.local.set({ [key]: false });
      }
    });
  });

  $extendPasswordButton.addEventListener('click', () => {
    sendMessageToContentScript('extendPassword');
  });

  $allPersonAddDataButton.addEventListener('click', () => {
    sendMessageToContentScript('allPersonAddData');
  });

  $selectedPersonAddDataButton.addEventListener('click', () => {
    sendMessageToContentScript('selectedPersonAddData');
  });

  

  async function sendMessageToContentScript(key) {
    const [tabs] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const receivedMessage = await chrome.tabs.sendMessage(tabs.id, {
      from: 'popup',
      action: key,
    });
    if (receivedMessage?.success) {
      window?.close();
    }
  }
});
```



## 제품 선택 페이지에서 사용할 content script : js/pages/selectProduct.js

- `chrome.runtime.onMessage`메소드
  - `popup.mjs` 혹은 이번에 사용하지는 않았지만 `background.js`에서 메세지를 보내면 받을 수 있는 기능을 제공한다. 위 코드에서 보았듯이 `popup.mjs`에서 보낸 메세지를 받아서 `msg.from`, `msg.action`으로 구분할 수 있다.
  - 메세지를 받아서 동작해야 할 함수를 호출한다.
  - action명은 항상 실행되게 하는 동작에 대해서는 always를 붙여주었고, 한번만 실행되는 단일동작에 대해서는 붙어주지 않았다. ex) `alwaysExtendPassword`, `extendPassword`
- `storageKeysToFunctionMap`객체
  - 여기서는 key값과 실행할 함수를 매핑지어주었다.
  - 어떤 동작이 Toggle ON상태라면 어느 탭에서나 동작해야하는 페이지로 들어갔을 때는 실행되어야 한다. 따라서, 해당 객체를 순회하면서 해당 key값에 true값이 들어있다면 매핑해준 함수가 실행되도록 했다.
- `dontViewLoginHistory` 함수
  - 로그인 기록 모달을 보이지 않게 하기 위해서 작성한 함수다.
  - 로그인 기록 모달은 document.cookie에 `WELCOME_PAGE=done` 일 때 나타나지 않는다.
  - sendResponse callback함수가 있을 때 실행하는 조건문은 페이지에 이미 진입한 상태에서 토글을 ON했기 때문에 이미 열려있는 DOM요소를 제거해주기 위함이다. 그리고 document.cookie를 지정해주는데 ON인 상태가 유지된다면 다른 탭에서 해당 페이지로 접근해도 계속 로그인 히스토리를 보지 않기 위함이다. 만약, OFF를 했고 페이지에 도착한다면 document.cookie의 WELCOME_PAGE를 다른 값으로 바꿔놓는다.
  - 함수 내에서 선언한 selector가 로그인 내역이란 text를 가지고 있을 때 모달을 지워주게 했는데, 이는 modalFrm이란 id셀렉터로 공지용으로 사용하고 있는 popup창과 겹치기 때문이다.
- `dontViewPopup` 함수
  - 공지용으로 사용하는 모달을 보이지 않게 하기 위한 함수다.
  - 현재 `selectproduct.js`파일은 페이지에서 가장 먼저 실행되도록 했다. 이유는 미리 쿠키를 저장해서 로그인기록팝업창을 보지 않게 하기 위함이다. 따라서 `dontViewPopup`함수도 가장 먼저 실행되는데 이 시점에는 지워야 하는 DOM요소가 없다. **공지용 팝업은 페이지가 완전히 그려지고 api호출로 이뤄지기 때문**. 그래서 setInterval로 주기적으로 DOM요소가 있는지 확인하고 요소가 완성됬을 때 삭제 되도록 했다. 해당 페이지는 지나가는 페이지일 뿐이고 다른 기능이 없기 때문에 이렇게 하더라도 사용 경험이 나쁘지 않으면서 웹 속도에 영향을 끼치지 않을 정도라고 판단했다. 삭제에 성공하면 interval은 종료된다.
- `extendPassword`함수
  - 비밀번호 기한을 연장하는 함수다.
  - 현재 origin주소를 읽어서 비밀번호 기한 연장이 필요한지 api를 먼저쏴보고, 필요하다면 비밀번호 기한 연장 api를 쏜다.
  - 페이지에 도착했을 때 비밀번호연장 토글을 ON한다면 비밀번호 연장 API를 쏘고나서 새로고침하는 것을 처음 계획했으나, 매끄러운 사용자 경험을 위해 모달창을 지워주는 것으로 변경했다.
  - 이를 위해서 manifest.json 파일에 보면 `run_at` 값이 document_start로 되어있는 것을 볼 수 있다.

```js
(async () => {
  const src = chrome.runtime.getURL("js/helper/common.js");
  const commonScript = await import(src);

  commonScript.matchUrlToRun("/cus/selectProduct")
    ? console.log("%c [Jobflex Extension] 제품선택 페이지 정상 진입", "color: white; background: #00C17C; padding: 10px;")
    : "";

  if (!commonScript.matchUrlToRun("/cus/selectProduct")) {
    return false;
  }

  chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.from === "popup") {
      switch (msg.action) {
        case "alwaysDontViewLoginHistory":
          dontViewLoginHistory(sendResponse);
          break;
        case "alwaysDontViewPopup":
          dontViewPopup(sendResponse);
          break;
        case "alwaysExtendPassword":
        case "extendPassword":
          extendPassword(sendResponse);
          break;
      }
    }
  });

  const storageKeysToFunctionMap = {
    alwaysDontViewLoginHistory: dontViewLoginHistory,
    alwaysDontViewPopup: dontViewPopup,
    alwaysExtendPassword: extendPassword,
  };

  Object.entries(storageKeysToFunctionMap).forEach(([key, fn]) => {
    chrome.storage.local.get([key]).then((result) => {
      if (result[key]) {
        fn();
      } else if (key === "alwaysDontViewLoginHistory" && !result[key]) {
        document.cookie = "WELCOME_PAGE=false";
      }
    });
  });

  function dontViewLoginHistory(sendResponse) {
    if (sendResponse) {
      const modalTitle = document.querySelector(".h1.face-lift-h1") || document.querySelector(".h1 ");
      if (modalTitle?.textContent === "로그인 내역") {
        modalTitle.closest("#modalFrm").remove();
        sendResponse({ success: true });
      }
    }
    document.cookie = "WELCOME_PAGE=done";
  }

  function dontViewPopup(sendResponse) {
    let timer = setInterval(() => {
      if (document.querySelector("[data-popup]")) {
        removeDOM();
        if (sendResponse) sendResponse({ success: true });
        clearInterval(timer);
      }
    }, 500);

    function removeDOM() {
      [...document.querySelectorAll("[data-popup]")].forEach((element) => {
        element.remove();
      });
    }
  }

  async function extendPassword(sendResponse) {
    const origin = window.location.origin;

    // 비밀번호 만료가 되었는지 먼저 체크. 만료 되었으면 연장api를 실행.
    const expiredPasswordResponse = await fetch(`${origin}/cus/member/isExpiredPassword`, {
      method: "POST",
    });
    const isExpiredPassword = await expiredPasswordResponse.json();
    if (!isExpiredPassword) return;

    await fetch(`${origin}/chrome-extension/extend-password-expiration-date`, {
      method: "POST",
    });

    // 페이지 진입 전 Always ON이면 local storage데이터를 읽어서 사전에 API를 쏘기 때문에 모달이 안뜬다. 즉, sendResponse가 필요없다.
    if (sendResponse) {
      sendResponse({ success: true });
      document.querySelector('[data-type="changePassword"]').remove();
    }
  }
})();

```

이런 식으로 다른 페이지들에서 사용하는 content script파일들도 작성되어있다.



## 후기

- 현 회사의 경우 보안이 매우 엄격해서 크롬 익스텐션을 만들고 크롬에 로컬로 업로드하는 것조차 쉽지 않았다. 팀장님과 정보보호셀을 설득하면서 진행했는데, 다들 적극적으로 도와주셔서 시작할 수 있었고 적극적인 백엔드 동료가 있어서 크롬 익스텐션 전용 api를 만들 수 있었고 더 성공적으로 초기버전을 만들 수 있었다.
- 처음엔 크롬익스텐션 아이콘에 ON/OFF 상태를 나타내면서 background.js로 1가지 기능만 동작하게 구현했으나, 지금 베이스를 잡을 때 페이지로 만들어서 앞으로 여러 기능을 추가하기 편하게 해놓으면 좋을 것 같다라는 생각에 크롬익스텐션 페이지를 추가하고 popup.js ↔ contentscript.js 파일로 메시지를 주고 받는 방식을 택했다.
- 크롬에서 생각보다 굉장히 많은 API들을 지원하고 있다. 앞으로 또 어떤 기능을 추가해 어떤 도움을 줄 수 있을지 신나는 경험이었다.
- manifest버전이 2에서 3으로 올라감에 따라서 레퍼런스들을 찾기가 어려워졌고.. 2로 개발방향을 바꿔서 개발을 했지만 크롬이 이제는 3이상만 지원하는 것을 깨달았다.
- 하루동안 가능성을 검토하고, 되겠다 싶어서 1주일간 개발했고 2일동안 리팩토링을 진행하면서 오랜만에 누군가에게 도움이되고 제가 원하는 걸 만들어 본 경험이라 재밌는 시간이었다. 앞으로 계속 유지되면서 여러 사람에게 도움을 줄 수 있는 익스텐션이 되었으면 좋겠다.