import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import AuthInfo from './AuthInfo';
import OfficeInfo from './OfficeInfo';
import TaxInfo from './TaxInfo';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ThirdStep = () => {
  //세금 정보
  const { data: incomeData } = useSWR(
    `${process.env.REACT_APP_BASE_URL}/api/v1/tax/incomes`,
    fetcher,
  );

  //세무서 정보
  const { data: officeData } = useSWR(
    `${process.env.REACT_APP_BASE_URL}/api/v1/tax/office`,
    fetcher,
  );

  return (
    <__Container>
      <img alt={'done-icon'} src={'/images/complete-Icon.png'} />
      <h1>인증완료</h1>
      <__Noti>본인인증이 완료되었습니다.</__Noti>
      <__Wrapper>
        <AuthInfo />
        <TaxInfo {...incomeData?.data?.tax} />
        <OfficeInfo {...officeData?.data?.tax?.office} />
      </__Wrapper>
    </__Container>
  );
};

export default ThirdStep;

const __Container = styled.div`
  padding: 64px 24px 36px;

  h1 {
    margin-top: 16px;
    font-size: 24px;
    font-weight: 700;
  }
`;

const __Noti = styled.p`
  margin-top: 16px;
  font-weight: 500;
`;

const __Wrapper = styled.section`
  margin-top: 32px;
`;
