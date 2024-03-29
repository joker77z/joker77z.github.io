import Layout from 'components/Layout/Layout';
import Content from 'components/Post/Content';
import { graphql } from 'gatsby';

export default function PostTemplate({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary, // 나중에 사용할 예정입니다!
        date,
        categories,
        thumbnail: {
          childImageSharp: { gatsbyImageData },
          publicURL,
        },
      },
    },
  } = edges[0];

  return (
    <Layout>
      <h2>{title}</h2>
      <p>{date}</p>

      <Content html={html} />
      {/* <Index /> */}

      {/* <PostHead
        title={title}
        date={date}
        categories={categories}
        thumbnail={gatsbyImageData}
      /> */}
      {/* <PostContent html={html} />
      <CommentWidget /> */}
    </Layout>
  );
}

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;
