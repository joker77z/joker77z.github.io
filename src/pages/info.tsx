import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`

interface TextProps {
  disabled?: boolean
}

const Text = styled.div<TextProps>`
  font-size: 40px;
  font-weight: 700;
  text-decoration: ${({ disabled }) => (disabled ? 'line-through' : 'none')};
`

interface InfoPageProps {
  data: {
    site: {
      siteMetadata: {
        author: string
        description: string
        title: string
      }
    }
  }
}

export default function InfoPage(props: InfoPageProps) {
  const {
    data: {
      site: {
        siteMetadata: { author, description, title },
      },
    },
  } = props

  return (
    <div>
      <Global styles={globalStyle} />
      <Text>{title}</Text>
      {description} {author}
      <Link to="/">To Home</Link>
    </div>
  )
}

export const metadataQuery = graphql`
  {
    site(siteMetadata: {}) {
      siteMetadata {
        author
        description
        title
      }
    }
  }
`
