---
date: '2023-01-14'
title: 'Gatsby 블로그 SEO향상 시키기'
categories: ['Tip']
summary: '구글에서 검색 안되는 문제를 해결해보자.'
thumbnail: '../images/image-20230101171834438.png'
---



> 🧑🏼‍💻 블로그를 새로 만들고 2주가 지났다. 글을 쓰면 구글에 제목으로 검색했을 때 저 뒤 페이지에라도 글이 노출되어야 하는데 전혀 노출이 되지 않고 있었다. 구글 서치엔진이 내 글을 추적하고 있지 못하고 있다는 것이었다. 구글 Search Console을 확인해보니 index페이지를 제외하고는 모든 페이지가 색인이 되고있지 않았다. 문제 원인을 확인해보기 위해 모든 페이지에 대해 URL검사를 시행해보았다. "URL이 Google에 등록되어 있지 않음"으로 나오는 것이다.
> SEO가 좋지 않아서 발생하는 문제인지 의심을 해보았고 문제를 해결하기 위해 SEO를 향상시킬 수 있는 방법을 찾아보기로 했다.



## 현재 블로그 SEO는 어떠한가?

- 현재 내 블로그는 react-helmet을 이용하여 컨테이너 컴포넌트를 만들었고 각 페이지는 이 컨테이너 컴포넌트를 template으로 사용하도록 메타데이터를 추가해주고 있다.

- gatsby-plugin-sitemap을 이용해서 sitemap.xml파일을 만들고 있다.
- robots.txt를 이용하여 크롬의 크롤링봇이 블로그의 모든 페이지를 인식할 수 있게 조치해두었다.

> SEO 최적화를 충분히 고려했고, 적용했다고 생각했다. 조금 더 시도해볼 수 있는 것이 있을까?



## 이후 내가 시도해본 것들

- 기존 sitemap플러그인에서 `gatsby-plugin-advanced-sitemap` 플러그인으로 바꿨다. url에서 바로 sitemap으로 접근할 때 좀 더 가독성이 좋게 하기 위함이었다.이미지 리소스를 연결해서 미디어 인덱싱도 좋게한다고 하니 안할 이유가 없었다.

![beforeAndAfter](https://user-images.githubusercontent.com/120485/53555088-d27a0280-3b73-11e9-88ca-fb4ec08d9d26.png)

- 구글 Search Console에 등록한 sitemap.xml파일 방식을 교체해봤다. 기존에는 /sitemap-index.xml 파일아래에 /sitemap-0.xml, /sitemap-1.xml 이런 식으로 한 xml 파일에서 너무 많은 사이트 정보를 가지고 있지 않도록 분할 했었는데 혹시 이것이 문제가 될까하여 sitemap.xml를 등록하여 하위에 있는 sitemap-pages.xml 하나만 읽도록 하는 방식으로 일단 바꿔보았다.
- 각 페이지들에 대해 색인 생성을 한번 요청해보았다. 요청하고 잠시 후 확인해봐도 여전히 "URL이 Google에 등록되어 있지 않음"으로 뜨길래 뭔가 문제가 있긴 확실히 있나보다 라고 생각했는데, sitemap을 바꿔서인지 요청을 한것이 처리가 된 것인지 "URL이 Google에 등록되어 있음"으로 어느순간 바뀌어 있었다.

> 한 동안 이것저것 시도해보면서 양질의 글을 써보고 색인이 잘 생성되는지 주기적으로 확인해 봐야 할 것 같다!





## Add SiteMetadata

> 추가로 혹시 페이지에 metadata생성을 위한 react-helmet을 아직 적용하지 않은 독자가 있다면 gatsby에서 자체적으로 제공하는 메타데이터를 추가할 수 있는 방법이 있으니 참고해보자. SEO 최적화를 위해 gatsby 공식 블로그를 찾다가 봤는데, 이 방법도 나쁘지 않은 것 같다.

공식문서에 따르면 페이지들에 title이나 description같은 메타데이터를 추가하면 구글 Search Console이 이해하는데 도움이 된다고 한다. 그리고 이것은 검색 결과에 노출되는데 중요한 역할을 한다고 한다. 뿐만 아니라 우리가 트위터, 카카오 채팅방 같은 곳에 공유할 때 정보가 함께 노출되어 다른 플랫폼에 공유할 때도 이점을 누릴 수 있다.

gatsby-config.js 파일에서 아래와 같은 형식의 코드를 추가하라고 한다. 여기서 적은 내용들은 메인 페이지의 링크를 복사해서 다른 곳에 넣을 때 노출되는 정보가 된다.

```js
> gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Using Gatsby Head`,
    description: `Example project for the Gatsby Head API`,
    twitterUsername: `@gatsbyjs`,
    image: `/gatsby-icon.png`,
    siteUrl: `https://www.yourdomain.tld`,
  },
}
```



그 다음에 페이지에서도 메타데이터를 만들어야 되기 때문에 커스텀 훅으로 만들어서, 컴포넌트에서 가져다가 쓰는 방식으로 공식문서에서 소개하고 있다.

```jsx
import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}
```

```jsx
> src/components/seo.jsx

import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const SEO = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl, twitterUsername } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>" />
      {children}
    </>
  )
}
```



그리고 page에서 사용할 때 아래와 같이 사용한다. 

```jsx
> src/pages/index.jsx

import React from "react"
import { SEO } from "../components/seo"

const IndexPage = () => {
  return (
    <main>
      Hello World
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <SEO />
)
```

보면 named export로 Head를 내보내고 있다. 이것이 Gatsby에서 제공하는 `Gatsby Head API`다.

react-helmet보다 더 사용하기 쉽고, 더 좋은 성능, 더 작은 번들 사이즈, 최신 리액트 기능을 지원한다고 한다.

> 나는 react-helment을 이용하여 Container Component에 이미 metadata들을 세팅해서 사용하고 있기 때문에 해당 방법은 사용하지 않았지만, 이 방법도 괜찮은 것 같다.





---

## 참조

[Gatsby - plugin-advanced-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-advanced-sitemap/)

[Gatsby - Adding an SEO Component](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/)



