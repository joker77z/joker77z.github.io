import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import Footer from 'components/Layout/Footer'
import { Helmet } from 'react-helmet'
import GlobalStyle from './GlobalStyle'

const Container = styled.main`
  display: flex;
  gap: 52px;
  flex-direction: row;
  height: 100vh;
  width: 100vw;

  justify-content: center;
  padding-top: 128px;

  transition: background-color 0.3s ease;
`

type TemplateProps = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Template: FunctionComponent<TemplateProps> = function ({
  title,
  description,
  url,
  image,
  children,
}) {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@사용자이름" />
        <meta name="twitter:creator" content="@사용자이름" />

        <meta
          name="google-site-verification"
          content="bxX7zw7Z1d7r2tCFQ--AzadFwXLPP_KquUqaWiVRO7Y"
        />

        <meta
          name="naver-site-verification"
          content="ef4087be281a021be5e20418fb8c38b8570d41cb"
        />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {children}
      {/* <Footer /> */}
    </Container>
  )
}

export default Template
