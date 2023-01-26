import React from 'react';
import styled from 'styled-components';

interface Props {
  incomes?: [
    {
      type: string;
      amount: number;
    },
  ];
}

const TaxInfo = (props: Props) => {
  const { incomes } = props;

  // type별 타이틀 반환함수
  const handleOnTitle = (type: string) => {
    switch (type) {
      case 'prepaid':
        return '돌려받을 세금';
      default:
        return '이미 낸 세금';
    }
  };

  return (
    <__InfoWrapper>
      <h5>상세 정보</h5>
      <__InfoBox>
        {incomes?.map((info, idx) => {
          return (
            <__Wrapper key={idx}>
              <__Title>{handleOnTitle(info?.type)}</__Title>
              <__Info>{info?.amount}</__Info>
            </__Wrapper>
          );
        })}
      </__InfoBox>
    </__InfoWrapper>
  );
};

export default TaxInfo;

const __InfoWrapper = styled.div`
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  h5 {
    font-weight: 500;
  }
`;

const __InfoBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 32px;
`;

const __Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const __Title = styled.p``;

const __Info = styled(__Title)`
  text-align: end;
`;
