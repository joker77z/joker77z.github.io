import { RouteStore } from 'components/constants/route';
import { useEffect, useState } from 'react';
import * as S from './ListHeader.style';

export default function ListHeader() {
  const parseQueryStringValue = window.location.search.split('=')[1];
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  useEffect(() => {
    switch (parseQueryStringValue) {
      case RouteStore.TROUBLE_SHOOTING:
        setTitle('서재');
        setSubTitle('깊은 고민을 기록하는 공간 ');
        break;
      default:
        break;
    }
  }, []);

  return (
    <S.ListHeaderArea>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.ListHeaderArea>
  );
}
