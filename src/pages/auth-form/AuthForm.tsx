/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  validateFullRegNo,
  validateName,
  validatePhoneNumber,
} from '../../utils/validationUtil';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';

const AuthForm = () => {
  const params = useParams();
  const location = useLocation();
  const [disabled, setDisabled] = useState(true);

  const methods = useForm({ mode: 'all' });

  const { setError } = methods;

  const switchAuthPage = () => {
    switch (true) {
      case params.step === '2':
        return <SecondStep />;
      default:
        return <FirstStep disabled={disabled} />;
    }
  };

  const onSubmit = (data: any) => {
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
  min-height: 100vh;
`;
