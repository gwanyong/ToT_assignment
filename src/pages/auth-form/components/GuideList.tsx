import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  description: string;
  image: string;
}

const GuideList = (props: Props) => {
  const { title, description, image } = props;

  return (
    <__ListWrapper>
      <__GuideImg alt="guide-img" src={image} />
      <__DescWrapper>
        <__Title>{title}</__Title>
        <__Desc>{description}</__Desc>
      </__DescWrapper>
    </__ListWrapper>
  );
};

export default GuideList;

const __ListWrapper = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const __DescWrapper = styled.div`
  margin-left: 36px;
  max-width: 171px;
`;

const __GuideImg = styled.img`
  width: 88px;
`;

const __Title = styled.h4`
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
`;

const __Desc = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #878d96;
`;
