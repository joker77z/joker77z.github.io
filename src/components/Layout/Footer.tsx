import styled from '@emotion/styled'

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

export default function Footer() {
  return (
    <FooterWrapper>
      Thank You for Visiting My blog, Have a Good Day 😆
      <br />© 2023 Developer Park, Powered By Gatsby.
    </FooterWrapper>
  )
}
