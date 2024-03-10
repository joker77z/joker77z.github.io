import { useState } from 'react';
import Moon from '../../images/Moon';
import Sun from '../../images/Sun';
import * as S from './LNB.style';

export default function LNB() {
  const [theme, setTheme] = useState('white');

  const toggleSVG = () => {
    if (theme === 'dark') {
      return <Sun />;
    }

    return <Moon />;
  };

  const handleClickToggle = () => {
    const $body = document.querySelector('body');

    if ($body?.classList.contains('dark')) {
      $body.classList.remove('dark');
      setTheme('white');
    } else {
      $body?.classList.add('dark');
      setTheme('dark');
    }
  };

  const parseQueryStringValue = window.location.search.split('=')[1];
  const pathName = window.location.pathname.split('/')[1];
  console.log(
    '🚀 ~ LNB ~ pathName:',

    pathName,
  );

  return (
    <S.TableOfContentsSection>
      <S.ThemeToggleButton onClick={handleClickToggle}>
        {toggleSVG()}
      </S.ThemeToggleButton>

      {/* <SectionHeader></SectionHeader> */}
      <S.TableOfContents>
        <S.ListItem>
          <S.LinkItem to="/" active={!parseQueryStringValue && !pathName}>
            프로필
          </S.LinkItem>
        </S.ListItem>
        <S.ListItem>
          <S.LinkItem
            to="/list/?category=troubleShooting"
            active={
              parseQueryStringValue === 'troubleShooting' ||
              pathName === 'troubleShooting'
            }
          >
            수첩
          </S.LinkItem>
        </S.ListItem>
        <S.ListItem>
          <S.LinkItem to="/list/?category=Tip" activeClassName="activeIndex">
            서재
          </S.LinkItem>
        </S.ListItem>
        {/* <ListItem>
          <LinkItem activeClassName="activeIndex">도서관</LinkItem>
        </ListItem>
        <ListItem>
          <LinkItem activeClassName="activeIndex">툴박스</LinkItem>
        </ListItem> */}
      </S.TableOfContents>
    </S.TableOfContentsSection>
  );
}
