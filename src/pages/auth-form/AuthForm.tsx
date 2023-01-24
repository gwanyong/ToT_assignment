/* eslint-disable react/jsx-pascal-case */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
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
  const location = useLocation();
  const navigator = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const setErrMessage = useSetRecoilState(errorMessageState);

  const methods = useForm({ mode: 'all' });

  const { setError } = methods;

  const switchAuthPage = () => {
    switch (true) {
      case params.step === '2':
        return <SecondStep />;
      case params.step === '3':
        return <ThirdStep />;
      default:
        return <FirstStep disabled={disabled} />;
    }
  };

  const onSubmit = async (data: any) => {
    if (
      !validateName(data.name) ||
      data.name[0].includes(' ') ||
      data.name[data.name.length - 1].includes(' ')
    ) {
      setError('name', {
        message: '올바른 이름을 입력해주세요)',
      });
      return;
    }

    if (!validatePhoneNumber(data.phoneNumber)) {
      setError('phoneNumber', {
        message: '올바른 전화번호를 입력해주세요)',
      });
      return;
    }

    if (!validateFullRegNo(data.birth + data.regNum)) {
      setError('regNum', {
        message: '올바른 주민번호를 입력해주세요)',
      });
      return;
    }
    setDisabled(false);
    console.log(data);
    try {
      const body = {
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        regNumber: data?.birth + data?.regNum,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/easysign/complete`,
        { ...body },
      );
    } catch (error) {
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
