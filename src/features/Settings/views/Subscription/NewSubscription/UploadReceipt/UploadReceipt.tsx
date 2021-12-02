import React from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Button } from 'antd';
import { Text } from '../../../../../../components';
import uploadImage from '../../../../../../assets/img/upload_image.png';
import './styles.less';

const UploadReceipt: React.FC<{handleUploadReceipt:(file:File)=>void}>= ({handleUploadReceipt}) => {
  const { t } = useTranslation('translation');
  
  return (
    <div
      className="upload-receipt-container"
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
          draggable
          className="uplod-drap-drop-section"
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
