import React from 'react';
import { AutoComplete, Input } from 'antd';
import Icon from '../../../Icon/Icon';

type Props = {};

const Search: React.FC<Props> = () => {
  return (
    <AutoComplete allowClear style={{ maxWidth: 500, width: '100%' }}>
      <Input
        size="middle"
        placeholder="Search patients, staff, invoices etc…"
        prefix={<Icon name="search" />}
      />
    </AutoComplete>
  );
};

export default Search;
