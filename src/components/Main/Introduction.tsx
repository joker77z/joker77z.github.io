import React from 'react'
import styled from '@emotion/styled'
import ProfileImage from 'components/Main/ProfileImage'
import { IGatsbyImageData } from 'gatsby-plugin-image'

const Background = styled.div`
  width: 100%;
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  color: #ffffff;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    padding: 0 20px;
  }
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

export default function FunctionComponent({ profileImage }: IntroductionProps) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />

        <div>
          <SubTitle>FrontEnd Developer</SubTitle>
          <Title>Park Tae Joon</Title>
        </div>
      </Wrapper>
    </Background>
  )
}
