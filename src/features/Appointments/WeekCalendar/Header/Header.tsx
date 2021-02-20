import React from 'react';
import { HeaderProps } from 'react-big-calendar';
import moment from 'moment';
import Text from '../../../../components/Text/Text';

type Props = HeaderProps & {};

const Header: React.FC<Props> = ({ date }) => {
  return (
    <>
      <div>
        <Text size="xxxl" className="rbc-header-text">
          {moment(date).date()}
        </Text>
      </div>
      <div>
        <Text className="rbc-header-text">{moment(date).format('ddd')}</Text>
      </div>
    </>
  );
};

export default Header;
