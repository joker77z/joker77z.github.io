import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const gray = 'gray'

export const ani = css`
  @keyframes slidein {
    0% {
      opacity: 0;
      transform: translateY(5px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  animation: slidein 0.5s both;
`

export const Main = styled.div`
  width: 600px;
  ${ani}
`

export const Introduce = styled.section``
export const Description = styled.p`
  margin-top: 12px;

  color: ${gray};
  line-height: 28px;
`

export const SectionHeader = styled.h2`
  color: ${gray};
`

export const TableOfContentsSection = styled.section`
  margin-top: 40px;

  display: flex;
  gap: 40px;
`
export const TableOfContents = styled.ul`
  display: flex;
  flex-flow: column;
  gap: 8px;
`
export const ListItem = styled.li`
  list-style: none;
`
export const LinkItem = styled(Link)`
  text-decoration: underline;
  text-decoration-color: hsla(0, 0%, 100%, 0.1);
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
`

export const TagSection = styled.section`
  margin-top: 40px;

  display: flex;
  gap: 40px;
`
export const TagList = styled.ul``
export const Tag = styled.li`
  background: ${gray};
  border-radius: 8px;
  list-style: none;
`
