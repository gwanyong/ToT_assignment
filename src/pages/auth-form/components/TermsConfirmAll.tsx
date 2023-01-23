import React, { useEffect } from 'react';
import { Dispatch } from 'react';
import styled from 'styled-components';

interface IProps {
  checkedList: number[];
  setCheckedList: Dispatch<number[] | []>;
  isClickedAll: boolean;
  setIsClickedAll: Dispatch<boolean>;
}

const TermsConfirmAll = (props: IProps) => {
  const { setCheckedList, checkedList, setIsClickedAll, isClickedAll } = props;
  console.log(checkedList);

  useEffect(() => {
    if (checkedList.length === 4) {
      setIsClickedAll(true);
    } else {
      setIsClickedAll(false);
    }
  }, [checkedList?.length]);

  const handleClickAll = () => {
    setIsClickedAll(!isClickedAll);
    if (isClickedAll) {
      setCheckedList([]);
    } else {
      setCheckedList([...checkedList, 1, 2, 3, 4]);
    }
  };

  return (
    <__ContainerBtn>
      <button onClick={handleClickAll} />
      <__TermsWrapper>
        <img
          alt="checked"
          src={isClickedAll ? '/images/checked.png' : '/images/unChecked.png'}
        />

        <__TermsTitle>약관에 모두 동의</__TermsTitle>
      </__TermsWrapper>
    </__ContainerBtn>
  );
};

export default TermsConfirmAll;

const __ContainerBtn = styled.div`
  position: relative;
  button {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const __TermsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 12px;
  border: 1px solid #dde1e6;
  border-radius: 8px;

  img {
    margin-right: 12px;
    width: 24px;
    height: 24px;
  }
`;

const __TermsTitle = styled.p`
  font-size: 16px;
`;
