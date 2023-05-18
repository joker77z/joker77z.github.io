---
date: '2023-02-14'
title: '클로저 패턴을 사용해서 모듈화하기'
categories: ['troubleShooting']
summary: '5000줄이 넘는 코드 속에서 특정 관심사를 모을 수는 없을까?'
thumbnail: '../images/image-20230101171834438.png'
---



## 문제

오래된 서비스에 새로운 서비스를 연동해야 하는 일이 생겼다. 

- 오래된 서비스는 jQuery를 사용하고 있고, 하나의 javascript 파일에 적으면 1~3천줄 많으면 5천줄이 넘는 코드를 가지고 있다.
- 이 길고 긴 파일에서 전역 변수는 최상단에 선언되어있다. 심지어 변수명을 이해할 수 없는 변수들도 존재한다. 그리고 어디서 사용되는지, 사용되기는 하는지 알 수가 없는 변수가 한 가득이다.

이런 상황에서 새로운 서비스와 연동하기 위한 기능들을 추가해야 하는데 기존 구조에 다른 관심사를 가진 기능들을 추가하게 된다면, 코드를 작성한 자신 조차도 시간이 지났을 때 기존 구조를 파악하는데 시간이 오래 걸릴 것이다. 그림으로 보면 아래와 같은 모습 일 것이다. 주황색은 새로운 서비스를 연동하기 위해 추가한 코드이고 검정색은 기존 코드들이다.

![img](../images/closure-not-apply.png)



새로운 서비스와 연동하는데 필요한 변수들과 함수들을 기존 코드와 격리시키고 객체명만 보고도 어떤 기능들을 가지고 있는지 알면 좋겠다라고 생각했다. 그래서 클로저 패턴을 사용했다. 기존에 있던 로직들 사이에서는 클로저가 반환하는 함수만 사용하는 것이다. 이렇게 되면 기존 오래된 서비스 로직을 파악할 때는 새로운 서비스에서 사용되고 있는 로직들을 파악할 필요가 없다. 즉, 클로저 내부에서 어떤 변수가 사용되고, 어떻게 동작하는지 알 필요가 없다. 만약, 새로운 서비스와 연동하는데에서 발생한 문제라면 모듈화한 클로저 속에서 어떤 로직의 문제일 것이니 찾기도 쉬울 것이다. 그림으로 보면 아래와 같은 모습일 것이다.

![img](../images/closure-apply.png)

 



## 코드

간단하게 축약한 코드로 살펴보면 다음과 같다. jodaFn에서는 `init`함수와 `openJobdaLoginPopupAndLoadProfile`함수만 내보내서 필요한 곳에서 사용하고 있다. 이로서 jobda(새로운 서비스)와 관련된 로직을 파악할 때는 이곳만 보면 해당 js파일에서 어떤 로직들이 사용되는지 한눈에 파악할 수 있다.

```js
let RegistResume = (function() {
	let fn, keyData, recruitNoticeList = [], targetRecruitNotice = {}, paramData = {}, interval, modalAgreement = { canMoveNextStep: false }, blockEmailData, jfYn, jdYn;

	keyData = {
		// 수 많은 키와 값들..
	};

	paramData = {
		// 수 많은 키와 값들..
	};

	blockEmailData = ...

	/**
	 * JF3 계약 공고 시 지원서 작성 창에서 동작해야 할 로직들을 응집도있게 모아놨다.
	 * @type {{init(number): void, openJobdaLoginPopupAndLoadProfile(): void}}
	 */
	const jobdaFn = (() => {
		let isJobda = false;
		const urlParmas = new URLSearchParams(window.location.href);
		const accessToken = urlParmas.get('accessToken');

		const checkJobda = () => {
			$.ajax({
				type: 'get', dataType: 'json',
				url: ...,
				async : false,
			}).done(function(contractType, e) {
				isJobda = contractType === 'JOBDA';
				jdYn = contractType === 'JOBDA';
			});
		}
		
		const checkDirectEnter = () => {
			Common.modal({
				title : '올바르지 않은 방식의 접근',
				width : '500',
				height : '226',
				btnTitle : '채용사이트 공고로 돌아가기',
				enabledConfirm : false,
				enabledCancel : false,
				enabledCancelConfirm : false,
				btnEvent() {
					window.location.href = `${window.location.origin}/app/jobnotice/view?systemKindCode=MRS2&jobnoticeSn=${keyData.jobnoticeSn}`;
				},
				content : (function() {
					let t = [];
					t.push('<div style="font-size:14px;text-align:center">올바르지 않은 방식으로 접근하여 페이지를 찾을 수 없습니다.<br>정상적인 방법으로 다시 시도해 주세요.</div>');
					return t.join('');
				})()
			});
			return;
		}

		const loadJobdaUserProfile = (accessToken, jobnoticeSn) => {
			const jobdaApiDomain = $('#jobdaApiDomain').val();

			const param = {
				recruitNoticeSn: jobnoticeSn,
				accessToken: accessToken,
			}

			$.ajax({
				type: 'POST',
				dataType: 'json',
				beforeSend: Common.loading.show(),
				url: `...`,
				async: false,
				data: param,
			}).always(Common.loading.countHide).fail(Common.ajaxOnfail)
				.done(function(data, e) {
					const { name, email, mobile = '', certificated: isCertificated } = data;

					// 사용자 정보 DOM에 삽입
					$('#name').val(name);
					$('#mobile1').val(mobile?.slice(0, 3));
					$('#mobile2').val(mobile?.slice(3, 7));
					$('#mobile3').val(mobile?.slice(7));
					$('#email').val(email);
					$('#emailConfirm').val(email);
					$('#certificated').val(certificated.toString());

					// 사용자 정보 입력되고 나서 이름, 이메일 바로 유효성 검증.
					fn.checkName();
					fn.checkEmail();
					fn.checkConfirmFunc();
				});
		}

		return {
			init() {
				if (keyData.jobnoticeSn > 0 && keyData.recruitTypeCode !== 'RECOMMEND' && keyData.recruitTypeCode !== 'PRIVATE') {
					checkJobda();
				}

				if(isJobda) {
					// JF3 계약 시 생성된 공고인데 잡다 로그인 없이 url만으로 바로 들어왔을 때 채용사이트 공고로 다시 보낸다.
					if(!window.opener) {
						checkDirectEnter();
					}
					// 채용사이트를 통해 정상적으로 접근했다면, 잡다 정보를 넣는다.
					loadJobdaUserProfile(accessToken, keyData.jobnoticeSn);
				}
			},
			// 잡다 로그인 페이지를 열었다가 종료하며, 사용자 정보를 받아오고 input Element에 넣는다.
			openJobdaLoginPopupAndLoadProfile() {
				const messageUrl = window.location.href;
				const jobdaDomain = $('#jobdaDomain').val().trim();
				const PAGETYPE = 'mypage';

				const jobdaLogin = window.open(...);

				const jobdaLoginMessageFn = (event) => {
					if(event.origin === jobdaDomain) {
						if(event.data.isJobdaClose) {
							jobdaLogin.close();
						}
						if(event.data.accessToken) {
							jobdaLogin.close();
							loadJobdaUserProfile(event.data.accessToken);
						}
					}
				}
				window.addEventListener('message', jobdaLoginMessageFn, {once: true});
			}
		}
	})();

	fn = {
		init() {
			fn.load();
			fn.event();
			fn.privatePassword(); 
      
			jobdaFn.init();
		},
		load() {
			...
      jobdaFn.openJobdaLoginPopupAndLoadProfile();
		},
		event() {
      ...
    }
```



## 후기

실제로 새로운 서비스와 연동하는 과정에서 셀 수 없이 여러번 수정되었다. 새로운 서비스와 연동이 필요한 js파일들은 모두 클로저 패턴을 사용해서 모듈화 해두었는데, 덕분에 수정이 필요할 때마다 다른 이슈를 치다가도 금방 돌아가서 파악하고 수정할 수 있었다. 이론으로만 알고 있던 패턴을 실제로 사용해보니 좋은 경험이었다.

