import { graphql } from 'gatsby'
import Introduction from 'components/Main3/Introduction'
import Template from 'components/Layout/Template'
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
} from './style/common.style'
import * as S from './index.style'
import LNB from '../components/Layout/LNB'
import Layout from '../components/Layout/Layout'

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
      // childImageSharp: {
      //   gatsbyImageData: IGatsbyImageData
      // }
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
      // childImageSharp: { gatsbyImageData },
      publicURL,
    },
  },
}: IndexPage) {
  return (
    <Layout
      search={search}
      title={title}
      description={description}
      siteUrl={siteUrl}
      publicURL={publicURL}
    >
      <section>
        <h1>박태준 ﹒ Share Grow Develop</h1>
        <S.Description>
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
        </S.Description>
      </section>
    </Layout>
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
