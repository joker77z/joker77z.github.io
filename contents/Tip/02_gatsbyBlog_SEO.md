---
date: '2023-01-14'
title: 'Gatsby 블로그 SEO향상 시키기'
categories: ['Tip']
summary: '구글에서 검색 안되는 문제를 해결해보자.'
thumbnail: '../images/image-20230101171834438.png'
---



> 🧑🏼‍💻 블로그를 새로 만들고 2주가 지났다. 글을 쓰면 구글에 제목으로 검색했을 때 저 뒤 페이지에라도 글이 노출되어야 하는데 전혀 노출이 되지 않고 있었다. 구글 서치엔진이 내 글을 추적하고 있지 못하고 있다는 것이었다. 구글 Search Console을 확인해보니 모두 다 색인이 되고있지 않았다.
> 문제를 해결하기 위해 SEO를 향상시킬 수 있는 방법을 찾아보기로 했다.



## Add SiteMetadata

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



## 

---

## 참조

[Gatsby - Adding an SEO Component](https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/)



