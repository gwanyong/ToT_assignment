import axios from 'axios';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { IForm } from '../../../../interfaces/form';
import themes from '../../../styles/themes';
import TermsConfirmAll from './TermsConfirmAll';

const titleList = [
  { id: 1, data: '[필수] 개인정보 이용 동의' },
  { id: 2, data: '[필수] 서비스 이용 약관 동의' },
  { id: 3, data: '[필수] 고유식별정보 처리 동의' },
  { id: 4, data: '[필수] 제3자 정보제공 동의' },
];

interface Props {
  onToggle: () => void;
}

const RegisterTermsMainTemplate = (props: Props) => {
  const { onToggle } = props;
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [isClickedAll, setIsClickedAll] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const { getValues } = useFormContext<IForm>();

  const navigate = useNavigate();

  //각각의 체크박스 클릭 함수
  const handleCheckedBtn = (id) => {
    setIsClicked(!isClicked);
    if (checkedList.includes(id)) {
      const result = checkedList.filter((item) => {
        return item !== id;
      });
      setCheckedList(result);
    } else {
      setCheckedList([...checkedList, id]);
    }
  };

  //모두 체크된 이후 인증버튼 클릭 함수
  const handleOnClick = async () => {
    navigate('/auth/2');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/easysign/request`,
      );
      if (res.status === 200) {
        onToggle();
        sessionStorage.setItem('startedAt', res?.data?.data?.startedAt);
        sessionStorage.setItem('expiredAt', res?.data?.data?.expiredAt);
        sessionStorage.setItem('userInfo', JSON.stringify(getValues()));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <__RegisterWrapper>
      <__Wrapper>
        <TermsConfirmAll
          setCheckedList={setCheckedList}
          checkedList={checkedList}
          setIsClickedAll={setIsClickedAll}
          isClickedAll={isClickedAll}
        />
        <__ListWrapper>
          {titleList.map((term) => {
            return (
              <__ListBox key={term.id}>
                <__CheckedBtn onClick={() => handleCheckedBtn(term.id)} />
                <img
                  src={
                    checkedList.includes(term.id)
                      ? 'images/list-checked.png'
                      : '/images/list-unChecked.png'
                  }
                ></img>
                <__TermsList>{term?.data}</__TermsList>
              </__ListBox>
            );
          })}
        </__ListWrapper>
        <__BtnWrapper>
          <__ConfirmBtn
            disabled={checkedList.length !== 4}
            onClick={handleOnClick}
          >
            동의하고 간편인증 하기
          </__ConfirmBtn>
        </__BtnWrapper>
      </__Wrapper>
    </__RegisterWrapper>
  );
};

export default RegisterTermsMainTemplate;

const __RegisterWrapper = styled.div`
  padding: 20px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  background: #ffffff;
`;

const __Wrapper = styled.div``;

const __ListWrapper = styled.ul`
  margin-top: 16px;
`;

const __ListBox = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const __CheckedBtn = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const __TermsList = styled.p`
  margin-left: 15.5px;
  padding: 5.5px 0;
  font-size: 14px;
  color: #697077;
`;

const __BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const __CancelBtn = styled.button`
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #d5d5d5;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const __ConfirmBtn = styled.button`
  margin-top: 32px;
  padding: 16px 0;
  width: 100%;
  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? '#c3d4fc' : '#6f94e9')};
  font-size: 16px;
  color: ${(props) => (props.disabled ? themes.color.white : '#ffffff')};
`;
