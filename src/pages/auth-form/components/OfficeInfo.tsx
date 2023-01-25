import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  phone: string;
}

const OfficeInfo = (props: Props) => {
  const { name, phone } = props;

  return (
    <__InfoWrapper>
      <h5>환금액 입금 안내</h5>
      <__InfoBox>
        <__Wrapper>
          <__Title>관할사무소</__Title>
          <__Info>{name}</__Info>
        </__Wrapper>
        <__Wrapper>
          <__Title>연락처</__Title>
          <__Info>{phone}</__Info>
        </__Wrapper>
      </__InfoBox>
    </__InfoWrapper>
  );
};

export default OfficeInfo;

const __InfoWrapper = styled.div`
  margin-top: 32px;
  padding: 16px;
  background-color: #f0f4fa;
  border-radius: 8px;
  h5 {
    font-weight: 500;
  }
`;

const __InfoBox = styled.div`
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
