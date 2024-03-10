import Layout from 'components/Layout/Layout';
import ListHeader from 'components/Layout/ListHeader';
import { graphql, navigate } from 'gatsby';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll';
import { PostListItemType } from 'types/PostItem.types';
import { RouteStore } from '../components/constants/route';
import * as S from './list.style';

type ListProps = {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
  };
};

export default function List({
  data: {
    allMarkdownRemark: { edges },
  },
}: ListProps) {
  const parseQueryStringValue = window.location.search.split('=')[1];

  const { containerRef, postList } = useInfiniteScroll(
    parseQueryStringValue,
    edges,
  );

  if (!Object.values(RouteStore).includes(parseQueryStringValue)) {
    return navigate('/404');
  }

  return (
    <Layout>
      <ListHeader />
      <ul>
        {postList.map(
          ({
            node: {
              id,
              fields: { slug },
              frontmatter,
            },
          }: PostListItemType) => (
            <S.LinkList>
              <S.LinkItem to={slug} key={slug}>
                <div>{frontmatter.title}</div>
              </S.LinkItem>
            </S.LinkList>
          ),
        )}
      </ul>
    </Layout>
  );
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
`;
