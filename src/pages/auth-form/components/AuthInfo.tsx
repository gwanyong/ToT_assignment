import React from 'react';
import styled from 'styled-components';

const titles = ['이름', '휴대폰 번호', '주민등록번호'];

const AuthInfo = () => {
  const getSessionData = sessionStorage.getItem('userInfo') as string;
  const userInfo = JSON.parse(getSessionData);

  //주민번호 마스킹 함수
  const maskRegNum = (regNum: string) => {
    return regNum.replace(
      regNum,
      regNum.replace(/(-?)([1-4]{1})([0-9]{6})\b/gi, '$1$2******'),
    );
  };

  return (
    <__InfoWrapper>
      <h5>기본 정보</h5>
      <__InfoBox>
        <div>
          {titles?.map((title, idx) => {
            return <__Title key={idx}>{title}</__Title>;
          })}
        </div>
        <div>
          <__Info>{userInfo.name}</__Info>
          <__Info>{userInfo.phoneNumber}</__Info>
          <__Info>
            {userInfo.birth}-{maskRegNum(userInfo.regNum)}
          </__Info>
        </div>
      </__InfoBox>
    </__InfoWrapper>
  );
};

export default AuthInfo;

const __InfoWrapper = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  background-color: #f0f4fa;
  border-radius: 8px;
  h5 {
    font-weight: 500;
  }
`;

const __InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const __Title = styled.p`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const __Info = styled(__Title)`
  text-align: end;
`;
