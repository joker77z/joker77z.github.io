import { graphql } from 'gatsby'
import Introduction from 'components/Main3/Introduction'
import Template from 'components/Common/Template'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import {
  Description,
  Main,
  Introduce,
  TableOfContents,
  ListItem,
  TableOfContentsSection,
  TagSection,
  Tag,
  TagList,
  SectionHeader,
  ListLink,
  ItemLink,
  LinkItem,
} from './style/index.style'

type IndexPage = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    file: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
      publicURL: string
    }
  }
}

export default function IndexPage({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}: IndexPage) {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Main>
        <Introduce>
          <h1>박태준 ﹒ Experience</h1>
          <Description>
            함께 성장하는 것을 좋아하는 FrontEnd 개발자입니다.
            <br />
            개발자 측면에서 어떻게 해야 가독성, 생산성을 올릴 수 있을지 DX를
            고민합니다.
            <br />
            사용자 측면에서 어떻게 하면 더 편리한 서비스를 제공할 수 있을지 UX를
            고민합니다.
            <br />
            <br />
            현재 마이다스인에서 채용솔루션을 개발하고 있습니다.
          </Description>
        </Introduce>
        <TableOfContentsSection>
          <SectionHeader>목차</SectionHeader>
          <TableOfContents>
            <ListItem>
              <LinkItem to="/list/?category=troubleShooting">일지</LinkItem>
            </ListItem>
            <ListItem>
              <LinkItem>고민</LinkItem>
            </ListItem>
            <ListItem>
              <LinkItem>성장</LinkItem>
            </ListItem>
            <ListItem>
              <LinkItem>영감</LinkItem>
            </ListItem>
            <ListItem>
              <LinkItem>공유</LinkItem>
            </ListItem>
          </TableOfContents>
        </TableOfContentsSection>
        <TagSection>
          <SectionHeader>태그</SectionHeader>
          <TagList>
            <Tag>태그1</Tag>
          </TagList>
        </TagSection>
      </Main>
    </Template>
  )
}

export const getMain = graphql`
  query getMain {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
