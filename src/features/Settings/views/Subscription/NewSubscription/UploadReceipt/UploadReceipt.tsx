import React from 'react';
import { useTranslation } from 'react-i18next';
import { RcFile } from 'antd/lib/upload';
import { Upload, Button } from 'antd';
import { Text } from '../../../../../../components';
import uploadImage from '../../../../../../assets/img/upload_image.png';
import './styles.less';

type Props = {
  isLoading: boolean;
  handleUploadReceipt: (file: File | RcFile) => void;
};

const UploadReceipt: React.FC<Props> = ({ handleUploadReceipt, isLoading }) => {
  const { t } = useTranslation('translation');
  const [file, setFile] = React.useState<File | RcFile | null>(null);

  const handleSubmit = () => {
    if (file) {
      handleUploadReceipt(file);
    }
  };

  return (
    <div className="upload-receipt-container">
      <Upload
        name="paymentReciept"
        multiple={false}
        accept="image/*,.pdf"
        beforeUpload={(f) => {
          setFile(f);
          return false;
        }}
      >
        <div draggable className="uplod-drap-drop-section draggable">
          <img src={uploadImage} alt="" />
          <Text style={{ fontSize: 14, color: '#74798C' }}>
            Drop image here or <span style={{ color: '#00B6F8' }}>browse</span> files
          </Text>
          <Text style={{ fontSize: 12, color: '#74798C' }}>Supports PNG, JPG, JPEG, PDF</Text>
        </div>
      </Upload>
      <Button
        loading={isLoading}
        type="primary"
        style={{ width: '600px', marginTop: 21 }}
        disabled={file === null || isLoading}
        onClick={handleSubmit}
      >
        {t('upload')}
      </Button>
    </div>
  );
};

export default UploadReceipt;
