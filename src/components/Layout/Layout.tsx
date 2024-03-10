import Template from 'components/Layout/Template'
import LNB from './LNB'
import { Main } from '../../pages/style/common.style'
import * as S from './Layout.style'

export default function Layout({
  search,
  title,
  description,
  siteUrl,
  publicURL,
  children,
}) {
  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <LNB search={search} />
      <S.Main>{children}</S.Main>
    </Template>
  )
}
