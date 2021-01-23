import { Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../../../components/Icon/Icon';
import Text from '../../../../../components/Text/Text';
import { getBase64 } from '../../../../../utils/base64';

type Props = {
  images: string[];
};

const Images: React.FC<Props> = () => {
  const { t } = useTranslation('translation');

  const [upload, setUpload] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });

  const handleCancel = () => setUpload({ ...upload, previewVisible: false });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setUpload({
      ...upload,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleChange = ({ fileList }: any) => {
    setUpload({ ...upload, fileList });
  };

  const uploadButton = (
    <div>
      <Icon name="add-line" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div>
      <Text> {t('cabinet on map')} </Text>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={upload.fileList}
        beforeUpload={(file: any) => {
          console.log(file);
          // handleUploadImage(file);
          return false;
        }}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {upload.fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={upload.previewVisible}
        title={upload.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={upload.previewImage} />
      </Modal>
    </div>
  );
};

export default Images;
