import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactInputMask from 'react-input-mask';
import Button from '../../../../../components/Button/Button';
import Label from '../../../../../components/Label/Label';
import Icon from '../../../../../components/Icon/Icon';
import { useAuthState } from '../../../../Auth';
import Spacer from '../../../../../components/Spacer/Spacer';
import ResetPhoneModal from './ResetPhoneModal/ResetPhoneModal';

type Props = {};

const Phone: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const { user } = useAuthState();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Spacer size="md" direction="vertical">
        <Form.Item>
          <Label title={t('login phone number')} />
          <ReactInputMask
            mask="+213 999 999 999"
            maskChar={null}
            value={user?.phone ?? ''}
            dir="ltr"
            name="phone"
            disabled
          >
            {(inputProps: any) => (
              <Input dir="ltr" prefix={<Icon name="phone-line" />} disabled {...inputProps} />
            )}
          </ReactInputMask>
        </Form.Item>
        <Button type="primary" block ghost onClick={() => setVisible(true)}>
          {t('change phone number')}
        </Button>
      </Spacer>
      <ResetPhoneModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Phone;
