import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Drawer from '../../../components/Drawer';
import themes from '../../../styles/themes';
import {
  validateFullRegNo,
  validateName,
  validatePhoneNumber,
} from '../../../utils/validationUtil';
import TermsModal from './TermsModal';

interface TForm {
  name: string;
  phoneNumber: string;
  birth: string;
  regNum: string;
}

interface Props {
  disabled: boolean;
}
const FirstStep = (props: Props) => {
  const { disabled } = props;

  const [nameError, setNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [regError, setRegError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { register, setFocus, watch } = useFormContext<TForm>();

  const handleOnClick = () => {
    if (
      !validateName(watch('name')) ||
      watch('name')[0].includes(' ') ||
      watch('name')[watch('name').length - 1].includes(' ') ||
      watch('name').length === 0
    ) {
      setNameError('올바른 이름을 입력해주세요');
    } else {
      setNameError('');
    }

    if (!validatePhoneNumber(watch('phoneNumber'))) {
      setPhoneNumberError('올바른 전화번호를 입력해주세요');
    } else {
      setPhoneNumberError('');
    }

    if (!validateFullRegNo(watch('birth') + watch('regNum'))) {
      setRegError('올바른 주민등록번호를 입력해주세요');
    } else {
      setRegError('');
    }

    if (!disabled) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    setFocus('name');
  }, []);

  const moveToPhonInput = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      setFocus('phoneNumber');

      if (!watch('name')) {
        setNameError('올바른 이름을 입력해주세요');
      }
    }
  };

  const moveToRefNumber = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('birth')?.focus();
    }
  };

  const moveToBehindNumber = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      setFocus('regNum');
    }
  };
  const haneleOnBirthChange = (e) => {
    if (e.target.value.length === 6) {
      setFocus('regNum');
    }
  };

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <__Container>
      <h1>
        정확한 환급액 조회를 위해
        <br />
        아래 정보가 필요해요!
      </h1>
      <__DescWrapper>
        <__Desc>
          고객님의 정보는 안전하게 보호되니
          <br />
          안심하고 입력하세요!
        </__Desc>
        <img src="/images/protect-img.png" alt="protect-img" />
      </__DescWrapper>
      <__FormWrapper>
        <__NameWrapper>
          <h4>이름</h4>
          <__NameInput
            {...register('name')}
            onKeyPress={(e) => moveToPhonInput(e)}
            maxLength={50}
          />

          {nameError ? (
            <__ErrorMessage>{nameError}</__ErrorMessage>
          ) : (
            <__Tip>
              <span>TIP</span> 닉네임이 아닌 실명인지 확인해주세요.
            </__Tip>
          )}
        </__NameWrapper>

        <__PhoneWrapper>
          <h4>휴대폰 번호</h4>
          <__PhoneInput
            {...register('phoneNumber')}
            onKeyPress={(e) => moveToRefNumber(e)}
            maxLength={11}
          />
          {phoneNumberError && (
            <__ErrorMessage>{phoneNumberError}</__ErrorMessage>
          )}
        </__PhoneWrapper>

        <__RegNumWrapper>
          <h4>주민등록번호</h4>
          <__RegBox>
            <Controller
              name="birth"
              render={({ field: { onChange, name } }) => (
                <__BirthInput
                  onChange={(e: any) => {
                    haneleOnBirthChange(e);
                    onChange(e);
                  }}
                  id={name}
                  onKeyPress={(e) => moveToBehindNumber(e)}
                  maxLength={6}
                />
              )}
            />

            <span>-</span>
            <__RegInput {...register('regNum')} maxLength={7} type="password" />
          </__RegBox>
          {regError && <__ErrorMessage>{regError}</__ErrorMessage>}
        </__RegNumWrapper>
      </__FormWrapper>
      <__NextButton
        onClick={handleOnClick}
        disabled={
          !watch('name') ||
          !watch('phoneNumber') ||
          !watch('birth') ||
          !watch('regNum')
        }
      >
        다음
      </__NextButton>

      <Drawer
        visible={isOpen}
        onToggle={handleToggleDrawer}
        direction={'bottom'}
      >
        <TermsModal />
      </Drawer>
    </__Container>
  );
};

export default FirstStep;

const __Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 24px 24px 24px;
  min-height: 100vh;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    line-height: 150%;
  }

  h4 {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #4d5358;
  }
`;

const __DescWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;
  padding: 0 10px 0 16px;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8f8;
`;

const __Desc = styled.p`
  padding: 14px 0;
  font-size: 14px;
  line-height: 19.6px;
`;

const __FormWrapper = styled.section``;

const __NameWrapper = styled.div`
  margin-bottom: 32px;
`;

const __ErrorMessage = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${themes.color.red};
`;

const __NameInput = styled.input`
  padding: 8.5px 16px;
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #000000;
`;

const __Tip = styled.p`
  margin-top: 8px;
  font-size: 14px;

  span {
    font-weight: 700;
    color: ${themes.color.blue};
  }
`;

const __PhoneWrapper = styled(__NameWrapper)``;
const __RegNumWrapper = styled(__NameWrapper)``;

const __RegBox = styled.div`
  display: flex;

  span {
    margin: 0 15.5px;
    font-size: 18px;
    font-weight: 700;
  }
`;

const __PhoneInput = styled(__NameInput)``;

const __BirthInput = styled(__NameInput)``;
const __RegInput = styled(__BirthInput)``;

const __NextButton = styled.button<{ disabled: boolean }>`
  margin: auto 0 24px 0;
  padding: 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: ${themes.color.white};
  background-color: ${(props) =>
    props.disabled ? '#dde1e6' : themes.color.blue};
  border-radius: 8px;
`;
