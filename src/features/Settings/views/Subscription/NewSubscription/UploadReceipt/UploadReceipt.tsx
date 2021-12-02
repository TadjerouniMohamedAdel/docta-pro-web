import React from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Button } from 'antd';
import { Text } from '../../../../../../components';
import uploadImage from '../../../../../../assets/img/upload_image.png';

const UploadReceipt: React.FC<{handleUploadReceipt:(file:File)=>void}>= ({handleUploadReceipt}) => {
  const { t } = useTranslation('translation');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Upload
        name="paymentReciept"
        accept="image/*,.pdf"
        beforeUpload={(file) => {
          handleUploadReceipt(file);
          return false;
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            height: 300,
            border: '2px dashed #E2E5F7',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={uploadImage} alt="" />
          <Text style={{ fontSize: 14, color: '#74798C' }}>
            Drop image here or <span style={{ color: '#00B6F8' }}>browse</span> files
          </Text>
          <Text style={{ fontSize: 12, color: '#74798C' }}>Supports PNG, JPG, JPEG, PDF</Text>
        </div>
      </Upload>
      <Button type="primary" style={{ width: '600px', marginTop: 21 }}>
        {t('upload')}
      </Button>
    </div>
  );
};

export default UploadReceipt;
