import { css } from '@emotion/react'
import styled from '@emotion/styled'

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
