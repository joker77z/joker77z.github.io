import styled from '@emotion/styled'
import PostItem from 'components/Main3/PostItem'
import { PostListItemType } from '../../types/PostItem.types'
import { useInfiniteScroll } from 'hooks/useInfiniteScroll'

type PostListProps = {
  posts: PostListItemType[]
  selectedCategory: string
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`

export default function PostList({ posts, selectedCategory }: PostListProps) {
  const { containerRef, postList } = useInfiniteScroll(selectedCategory, posts)

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
    </PostListWrapper>
  )
}
