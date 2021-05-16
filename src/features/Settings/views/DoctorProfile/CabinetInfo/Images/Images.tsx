import { Row, Col, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../../../../components/Icon/Icon';
import Text from '../../../../../../components/Text/Text';
import { getBase64 } from '../../../../../../utils/base64';
import { DoctorCabinetInfoForm, Image } from '../../types';
import ImageItem from './ImageItem/ImageItem';

type Props = {
  images: Image[];
  data: DoctorCabinetInfoForm;
  updateData: (values: DoctorCabinetInfoForm) => void;
  updateImages: (values: Image[]) => void;
};

const Images: React.FC<Props> = ({ data, updateData }) => {
  const { t } = useTranslation('translation');

  const [preview, setPreview] = useState({
    visible: false,
    imageUrl: '',
  });

  const handleCancel = () => setPreview({ ...preview, visible: false });

  const handleChange = async ({ file }: any) => {
    try {
      const result = await getBase64(file);
      updateData({
        ...data,
        images: [...data.images, { url: result as string, id: file.uid, isNew: true }],
        files: [...(data.files || []), file],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = (imageUrl: string): void => {
    setPreview({ visible: true, imageUrl });
  };

  const handleDelete = (id: string): void => {
    const updatedImages = [...data.images];
    const updatedFiles = [...data.files] as any[];

    const index = updatedImages.findIndex((item) => item.id === id);

    if (index > -1) {
      if (updatedImages[index].isNew) {
        const fileIndex = updatedFiles.findIndex((item) => item.uid === id);
        if (fileIndex > -1) {
          updatedFiles.splice(fileIndex, 1);
        }
        updatedImages.splice(index, 1);
      } else updatedImages[index].isDeleted = true;
      updateData({ ...data, images: updatedImages, files: updatedFiles });
    }
  };

  const uploadButton = (
    <div>
      <Icon name="upload-cloud-2-line" />
      <div className="ant-upload-text">
        <Text>{t('upload')}</Text>
      </div>
    </div>
  );

  return (
    <div>
      <Text> {t('cabinet photos')} </Text>
      <Row gutter={16}>
        {data.images
          .filter((item) => !item.isDeleted)
          .map((image, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index}>
              <ImageItem
                image={image}
                index={index}
                onDeleteImage={handleDelete}
                onPreviewImage={handlePreview}
              />
            </Col>
          ))}
        <Col>
          <Upload
            accept="image/*"
            listType="picture-card"
            beforeUpload={() => {
              return false;
            }}
            showUploadList={false}
            onChange={handleChange}
          >
            {data.images.filter((item) => !item.isDeleted).length >= 6 ? null : uploadButton}
          </Upload>
        </Col>
      </Row>
      <Modal
        visible={preview.visible}
        title={t('image preview')}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={preview.imageUrl} />
      </Modal>
    </div>
  );
};

export default Images;
