/* eslint-disable react/jsx-pascal-case */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { disabledState } from '../../recoil/auth/disabledState';
import { errorMessageState } from '../../recoil/auth/errorMessageState';
import {
  validateFullRegNo,
  validateName,
  validatePhoneNumber,
} from '../../utils/validationUtil';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';

const AuthForm = () => {
  const params = useParams();

  const methods = useForm({ mode: 'all' });

  const setErrMessage = useSetRecoilState(errorMessageState);
  const [isDisabled, setIsDisabled] = useRecoilState(disabledState);

  //각 스텝별 페이지 렌더링
  const switchAuthPage = () => {
    switch (true) {
      case params.step === '2':
        return <SecondStep />;
      case params.step === '3':
        return <ThirdStep />;
      default:
        return <FirstStep disabled={isDisabled} />;
    }
  };

  //각각의 필드들 유효성 검사 후 인증요청 보내는 함수
  const onSubmit = async (data) => {
    if (
      !validateName(data.name) ||
      data.name[0].includes(' ') ||
      data.name[data.name.length - 1].includes(' ')
    ) {
      return;
    }

    if (!validatePhoneNumber(data.phoneNumber)) {
      return;
    }

    if (!validateFullRegNo(data.birth + data.regNum)) {
      return;
    }
    setIsDisabled(false);
    try {
      const body = {
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        regNumber: data?.birth + data?.regNum,
      };
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/easysign/complete`,
        { ...body },
      );
      setErrMessage('');
    } catch (error) {
      console.log(error);
      setErrMessage('올바른 정보를 입력해주세요.');
    }
  };

  return (
    <FormProvider {...methods}>
      <__Container onSubmit={methods.handleSubmit(onSubmit)}>
        {switchAuthPage()}
      </__Container>
    </FormProvider>
  );
};

export default AuthForm;

const __Container = styled.form`
  margin: 0 auto;
  max-width: 640px;
  min-height: 100vh;
`;
