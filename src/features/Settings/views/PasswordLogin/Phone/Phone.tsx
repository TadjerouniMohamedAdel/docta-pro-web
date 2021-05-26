import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import { useAuthState } from '../../../../Auth';
import Spacer from '../../../../../components/Spacer/Spacer';
import ResetPhoneModal from './ResetPhoneModal/ResetPhoneModal';
import PhoneInput from '../../../../../components/PhoneInput/PhoneInput';

type Props = {};

const Phone: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const { user } = useAuthState();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Spacer size="md" direction="vertical">
        <PhoneInput disabled value={user?.phone} name="phone" />
        <Button type="primary" block ghost onClick={() => setVisible(true)}>
          {t('change phone number')}
        </Button>
      </Spacer>
      <ResetPhoneModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Phone;
