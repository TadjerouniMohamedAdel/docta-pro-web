import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import Modal from '../../../../../components/Modal/Modal';
import PasswordStep from './PasswordStep/PasswordStep';
import PhoneStep from './PhoneStep/PhoneStep';
import OTPFormStep from './OTPFormStep/OTPFormStep';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
};

const ResetPhoneModal: React.FC<Props> = ({ visible, setVisible }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<
    firebase.auth.ConfirmationResult | undefined
  >(undefined);

  const renderSteps = (): React.ReactNode => {
    switch (step) {
      case 1:
        return <PasswordStep setStep={setStep} />;
      case 2:
        return (
          <PhoneStep
            setConfirmationResult={setConfirmationResult}
            setStep={setStep}
            setPhoneNumber={setPhoneNumber}
          />
        );
      case 3:
        return (
          <OTPFormStep
            confirmationResult={confirmationResult}
            phoneNumber={phoneNumber}
            setVisible={setVisible}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title={t('change login phone number')}
      visible={visible}
      width={535}
      onCancel={() => setVisible(false)}
      actions={null}
    >
      <div style={{ padding: '30px 40px' }}>{renderSteps()}</div>
    </Modal>
  );
};

export default ResetPhoneModal;
