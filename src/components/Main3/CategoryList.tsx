import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { ReactNode } from 'react'

export interface CategoryListProps {
  selectedCategory: string
  categoryList: {
    [key: string]: number
  }
}

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`

interface CategoryItemProps {
  active: boolean
}

interface GatsbyLinkProps extends CategoryItemProps {
  children: ReactNode
  className?: string
  to: string
}

const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: ${({ active }) => {
    return active ? '800' : '400'
  }};
  color: ${({ active }) => {
    return active ? 'black' : 'gray'
  }};
  cursor: pointer;

  &:last-of-type {
    margin-right: 0;
  }
`
export default function CategoryList({
  selectedCategory,
  categoryList,
}: CategoryListProps) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([categoryItem, count]) => (
        <CategoryItem
          to={`/?category=${categoryItem}`}
          active={categoryItem === selectedCategory}
          key={categoryItem}
        >
          #{categoryItem}({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}
