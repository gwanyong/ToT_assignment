import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { IGuide } from '../../../../interfaces/guide';
import { serverTimeState } from '../../../recoil/auth/serverTimeState';
import themes from '../../../styles/themes';
import GuideList from './GuideList';

const SecondStep = () => {
  const [guideList, setGuideList] = useState<IGuide[]>([]);
  const serverTime = useRecoilState(serverTimeState);

  //가이드 리스트 호출 함수
  const fetchGuideList = async () => {
    try {
      const guideList = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/easysign/guides`,
      );

      setGuideList(guideList?.data?.data?.easysign?.guides);
    } catch (e) {
      // 오류 발생시 실행
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGuideList();
  }, []);

  return (
    <__Container>
      <__HeaderWrapper>
        <h1>
          카카오 지갑으로
          <br />
          간편인증 요청을 보냈습니다.
        </h1>
        <__TimerWrapper>
          <img alt={'timer'} src="/images/timer.png" />
          <span>04:51</span>
        </__TimerWrapper>
      </__HeaderWrapper>
      <__Dimmer />
      <__GuideWrapper>
        <__ListWrapper>
          {guideList?.map((guide, idx) => {
            return <GuideList key={idx} {...guide} />;
          })}
        </__ListWrapper>
      </__GuideWrapper>
      <__ButtonWrapper>
        <__AuthBtn>인증 완료</__AuthBtn>
      </__ButtonWrapper>
    </__Container>
  );
};

export default SecondStep;

const __Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const __HeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0 32px;
  text-align: center;
  background-color: ${themes.color.white};

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  h4 {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #4d5358;
  }
`;

const __TimerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 9px;
  background-color: #f2f4f8;
  border-radius: 4px;

  img {
    margin-right: 4px;
  }

  span {
    color: #878d96;
  }
`;

const __Dimmer = styled.div`
  height: 12px;
  background-color: #f2f4f8;
`;

const __GuideWrapper = styled.div`
  padding: 0 24px;
  background-color: ${themes.color.white};
`;

const __ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
`;

const __ButtonWrapper = styled.div`
  max-width: 592px;
  margin: auto 0 24px 0;
`;

const __AuthBtn = styled.button`
  padding: 16px;
  width: 100%;
  font-size: 16px;
  color: ${themes.color.white};
  background-color: ${themes.color.blue};
  border-radius: 8px;
`;
