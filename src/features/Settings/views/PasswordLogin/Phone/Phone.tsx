import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Spacer, PhoneInput } from '../../../../../components';
import { useAuthState } from '../../../../Auth';
import ResetPhoneModal from './ResetPhoneModal/ResetPhoneModal';

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
