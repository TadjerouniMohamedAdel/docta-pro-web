import { Col, Row } from 'antd';
import React from 'react';
import Button from '../../../../../../../components/Button/Button';
import Icon from '../../../../../../../components/Icon/Icon';
import { Image } from '../../../types';
import './styles.less';

type Props = {
  image: Image;
  index: number;
  onDeleteImage: (id: string) => void;
  onPreviewImage: (imageUrl: string) => void;
};

const ImageItem: React.FC<Props> = ({ image, onDeleteImage, onPreviewImage }) => {
  return (
    <div className="cabinet-image-wrapper">
      <img src={image.url} alt="cabinet" />
      <div className="image-actions">
        <Row>
          <Col>
            <Button type="text" size="small" onClick={() => onPreviewImage(image.url)}>
              <Icon name="eye-line" />
            </Button>
          </Col>
          <Col>
            <Button type="text" size="small" onClick={() => onDeleteImage(image.id)}>
              <Icon name="delete-bin-2-line" />
            </Button>
          </Col>
        </Row>
      </div>
      <div className="image-overlay" />
    </div>
  );
};

export default ImageItem;
