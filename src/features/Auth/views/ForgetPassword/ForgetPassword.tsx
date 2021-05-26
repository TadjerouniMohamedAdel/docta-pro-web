import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ForgetPasswordForm from './ForgetPasswordForm/ForgetPasswordForm';
import OTPForm from './OTPForm/OTPForm';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import Link from '../../../../components/Link/Link';
import Text from '../../../../components/Text/Text';
import Spacer from '../../../../components/Spacer/Spacer';

const ForgetPassword: React.FC = () => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const history = useHistory();
  const [step, setStep] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<
    firebase.auth.ConfirmationResult | undefined
  >(undefined);
  const [tokenId, setTokenId] = useState<string>('');

  const renderSteps = (): React.ReactNode => {
    switch (step) {
      case 1:
        return (
          <ForgetPasswordForm
            setConfirmationResult={setConfirmationResult}
            setStep={setStep}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 2:
        return (
          <OTPForm
            confirmationResult={confirmationResult}
            setStep={setStep}
            setTokenId={setTokenId}
            phoneNumber={phoneNumber}
          />
        );
      case 3:
        return <ResetPasswordForm tokenId={tokenId} />;

      default:
        return null;
    }
  };

  useEffect(() => {
    return () => {
      setStep(1);
    };
  }, []);

  return (
    <Spacer size="md" direction="vertical">
      {renderSteps()}
      <Text size="sm" style={{ margin: '0 auto', display: 'block' }}>
        {t('take me back to')} <Link onClick={() => history.push('/')}>{t('sign in')}</Link>
      </Text>
    </Spacer>
  );
};

export default ForgetPassword;
