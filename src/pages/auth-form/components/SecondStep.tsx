import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IGuide } from '../../../../interfaces/guide';
import { serverTimeState } from '../../../recoil/auth/serverTimeState';
import themes from '../../../styles/themes';
import GuideList from './GuideList';
import utc from 'dayjs/plugin/utc';
import { errorMessageState } from '../../../recoil/auth/errorMessageState';
import { useNavigate } from 'react-router-dom';

dayjs.extend(utc);

const SecondStep = () => {
  const startedAt = sessionStorage?.getItem('startedAt');
  const expiredAt = sessionStorage?.getItem('expiredAt');
  const started = dayjs(startedAt).utc();
  const ended = dayjs(expiredAt).utc();

  const diff = ended.diff(started);

  const [guideList, setGuideList] = useState<IGuide[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now() + 4000);
  const errorMessage = useRecoilValue(errorMessageState);

  const navigator = useNavigate();
  const countdownRef = useRef<Countdown>(null);

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

  useEffect(() => {
    if (isExpired) {
      countdownRef?.current?.start();
    }
  }, [isExpired]);

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
        setIsExpired(false);
        countdownRef?.current?.start();
        setCurrentTime(Date.now() + diff);
        return;
      }
    }

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
            date={currentTime}
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
      ? '/images/timer-red.png'
      : '/images/timer.png'}
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
