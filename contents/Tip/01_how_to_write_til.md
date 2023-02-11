---
date: '2023-01-07'
title: 'alias를 이용해 마크다운 에디터로 깃헙블로그와 TIL을 편하게 쓰기'
categories: ['Tip']
summary: 'CI/CD없이 빠르고 간편하게 내가 원하는 명령어들을 만들어보자.'
thumbnail: '../images/image-20230101171834438.png'
---



# TIL 쓰기

TIL을 쓰기 위해서는 깃헙에서 바로 작성하는 방법과 VSCode, Typora, Obsidian, Marktext 등 마크다운 편집을 지원하는 툴을 이용하여 작성하는 방법이 있다. 나는 마크다운으로 글을 작성할 때 실시간 미리보기가 가능한 글쓰기를 좋아한다. 그래서 깃헙에서 바로 쓰기보다는 실시간 미리보기를 지원하는 Typora를 사용하기로 했다. (Obsidian도 좋지만 묘하게 불편함을 겪었고, VSCode는 화면이 스플릿되서 미리보기 되는 것이 마음에 들지 않았고 MarkText는 아직 Typora에 불편함을 느끼지 못해 사용하지 않았다.)  

그런데, 이렇게 마크다운 에디터를 사용하게 되면 글을 작성하거나 수정할 때마다 터미널에서 해당 위치로 들어가서 pull하고 add, commit, push등을 해야 한다. 이 문제를 해결하고 싶었다. 내가 목표로 했던 것은 터미널을 열고 "til"을 치면 til 폴더로 진입하고 짧게 단축어를 입력하면 add, commit, push를 한번에 실행하는 것이었다.

 

## 터미널에서 간편하게 디렉토리 이동하기

> terminal alias를 이용해서 간편하게 디렉토리를 이동해보자.

### mac

```bash
> 1. alias를 설정할 수 있는 파일로 진입한다.
vi ~/.zshrc

> 2. i키를 눌러서 편집할 수 있도록 하고 alias를 찾아 아래와 같이 원하는 디렉토리를 설정한다.
alias til="cd Documents/til/TodayILearned"

> 3. :wq로 저장하고 빠져나온 뒤 아래 명령어로 터미널에 바로 반영해준다.
source ~/.zshrc
```



### window

window유저라면 `C:\Program Files\Git\etc\profile.d/aliases.sh` 파일에서 alias설정을 하면 git bash툴에서는 정상적으로 동작한다.

하지만, hyper같은 것을 사용했다면 alias가 동작안할 수 있다. 이럴 때는 아래 두 가지를 설정해주면 정상적으로 될 것이다. 나도 window를 사용할 때 이문제로 고생했다.

```javascript
config: {
  ...
  shellArgs: ['--command=usr/bin/bash.exe', '-l', '-i'],
  ...
}
```

```javascript
config: {
  ...
  env: {TERM: 'cygwin'},
  ...
}
```



## add-commit-push한번에 실행하기

터미널을 열고 아래 명령어를 붙여넣기하면 `git p`만 입력해도 add-commit-push를 실행하는데 커밋 메세지는 별 이모티콘을 자동으로 넣는다. 만약, 매번 커밋 내용을 넣고 싶다면 이모티콘대신 `$@`를 넣으면 된다! 그러면 `git p -m "커밋 내용"` 이렇게 매번 커밋 내용을 넣으면서 add-commit-push를 한번에 실행할 수 있다!

```bash
git config --global alias.p '!f() { git add -A && git commit -m "✨" && git push; }; f'
```

> 설정 후 적용된 alias 리스트를 보고싶다면 git config -l를 입력하면 된다.



## [응용편] github blog에도 적용해보기

나는 typora로 til과 gatsby로 만든 블로그 포스팅 두개 다 작성하고 있다.

`til` or `blog`만 입력해도 간편하게 이동할 수 있게 만들었고, 블로그 포스팅의 경우 쓰고나서 `git d`만 입력해도 `add-commit-push-deploy`가 되도록 하였다.

```bash
git config --global alias.d '!f() { git add -A && git commit -m "posting.." && git push && yarn deploy; }; f'
```



## 후기

실제로 굉장히 많이 삶의 질이 올라갔다. 예전에 til쓰기와 next로 만든 블로그를 운영할 때 중간에 포기했던 이유가 이런 불필요하면서 매번 반복하는 과정이 길었기 때문이다. 이제는 이 정도만 해도 불편하다고 느낀 적이 한번도 없다. ~~상대적이어서 그럴지도..?~~
