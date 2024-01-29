import { Link, graphql } from 'gatsby'
import { useInfiniteScroll } from 'hooks/useInfiniteScroll'
import { PostListItemType } from 'types/PostItem.types'

type ListProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
  }
}

export default function List({
  data: {
    allMarkdownRemark: { edges },
  },
}: ListProps) {
  const selectedCategory = 'troubleShooting'
  const { containerRef, postList } = useInfiniteScroll(selectedCategory, edges)
  console.log('postList', postList)
  return (
    <div>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <Link to={slug}>
            <div>{frontmatter.title}</div>
          </Link>
        ),
      )}
    </div>
  )
}

export const getList = graphql`
  query getList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
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
