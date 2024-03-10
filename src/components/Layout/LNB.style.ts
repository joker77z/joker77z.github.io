import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const ThemeToggleButton = styled.button`
  border: none;
  background: none;

  cursor: pointer;
`

export const LinkItem = styled(({ active, ...props }) => <Link {...props} />)`
  position: relative;

  ${({ active }) =>
    active &&
    css`
      color: var(--activeLink-text-color);
    `}

  text-decoration: underline;
  text-decoration-color: hsla(0, 0%, 100%, 0.1);
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;

  &:hover {
    /* color: var(--activeLink-hover-text-color); */

    &::before {
      display: block;
      content: '';
      background-color: gray;
      opacity: 0.2;
      position: absolute;
      left: -4px;
      right: -4px;
      top: -4px;
      bottom: -4px;

      z-index: -10;

      border-radius: 4px;
    }
  }
`

export const ListItem = styled.li`
  list-style: none;
`

export const gray = 'gray'

export const SectionHeader = styled.h2`
  color: ${gray};
`

export const TableOfContentsSection = styled.section`
  width: fit-content;

  display: flex;
  flex-flow: column;
  gap: 40px;
`
export const TableOfContents = styled.ul`
  color: gray;
  line-height: 24px;
  text-align: right;
  display: flex;
  flex-flow: column;
  gap: 8px;
`
