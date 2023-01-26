import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';

import utc from 'dayjs/plugin/utc';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import { IGuide } from '../../../../interfaces/guide';
import { errorMessageState } from '../../../recoil/auth/errorMessageState';
import themes from '../../../styles/themes';
import GuideList from './GuideList';

dayjs.extend(utc);

const fetcher = (url) => fetch(url).then((res) => res.json());
const SecondStep = () => {
  const navigator = useNavigate();
  const countdownRef = useRef<Countdown>(null);
  const errorMessage = useRecoilValue(errorMessageState);
  const startedAt = sessionStorage?.getItem('startedAt') as string;
  const expiredAt = sessionStorage?.getItem('expiredAt');

  const diff = dayjs(expiredAt).utc().diff(dayjs(startedAt).utc());

  const [guideList, setGuideList] = useState<IGuide[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const { data: server } = useSWR(
    `${process.env.REACT_APP_BASE_URL}/api/v1/serverTime`,
    fetcher,
  );

  const serverTime = server?.data?.serverTime;

  const resetTime = isReset ? serverTime : startedAt;

  const utc =
    new Date(resetTime).getTime() +
    new Date(resetTime).getTimezoneOffset() * 60 * 1000;

  const now = new Date(utc).getTime();

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
    countdownRef?.current?.start();
  }, [startedAt, serverTime, isReset]);

  useEffect(() => {
    fetchGuideList();
  }, []);

  // 분, 초를 받아 10초 남기고 styled 반영
  const renderer = ({ minutes, seconds }) => {
    return (
      <>
        <__TimerImg seconds={seconds} minutes={minutes}></__TimerImg>
        <__CountDown seconds={seconds} minutes={minutes}>
          0{minutes} : {String(seconds).length === 1 ? `0${seconds}` : seconds}
        </__CountDown>
      </>
    );
  };

  //인증 완료 버튼 클릭 시
  const handleOnClick = async () => {
    if (isExpired) {
      if (
        window.confirm(
          '인증 요청시간이 지났습니다.\n간편인증을 다시 시도해 주세요.',
        )
      ) {
        setIsReset(true);
        setIsExpired(false);
        countdownRef?.current?.start();

        return;
      }
    }
    //인증완료 버튼 클릭 시 에러가 발생한다면 다시 인증정보 페이지 오픈!
    if (errorMessage) {
      if (window.confirm(errorMessage)) {
        window.open('/', '_self', 'noopener, noreferrer');
      }
    } else {
      navigator('/auth/3', { replace: true });
    }
  };
  return (
    <__Container>
      <__HeaderWrapper>
        <h1>
          카카오 지갑으로
          <br />
          간편인증 요청을 보냈습니다.
        </h1>
        <__TimerWrapper>
          <Countdown
            ref={countdownRef}
            date={now + diff}
            renderer={renderer}
            onComplete={() => {
              setIsExpired(true);
            }}
          />
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
        <__AuthBtn onClick={handleOnClick}>인증 완료</__AuthBtn>
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
  padding: 4px 9px;
  background-color: #f2f4f8;
  border-radius: 4px;
`;

const __TimerImg = styled.div<{ seconds: number; minutes: number }>`
  width: 16px;
  height: 16px;
  ${(props) =>
    props.seconds <= 10 && props.minutes === 0
      ? css`
          background: url('/images/timer-red.png');
        `
      : css`
          background: url('/images/timer.png');
        `}
`;

const __CountDown = styled.p<{ seconds: number; minutes: number }>`
  margin-left: 4px;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) =>
    props.seconds <= 10 && props.minutes === 0 ? themes.color.red : '#878d96'};
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
  margin: auto 0 24px 0;
  padding: 0 24px;
`;

const __AuthBtn = styled.button`
  padding: 16px;
  width: 100%;
  font-size: 16px;
  color: ${themes.color.white};
  background-color: ${themes.color.blue};
  border-radius: 8px;
`;
