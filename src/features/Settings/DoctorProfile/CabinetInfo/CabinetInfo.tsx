import React, { useState } from 'react';
import Spacer from '../../../../components/Spacer/Spacer';
import { DoctorCabinetInfoForm, Service } from '../types';
import Address from './Address/Address';
import Images from './Images/Images';
import Map from './Map/Map';
import Services from './Services/Services';

type Props = {};

const CabinetInfo: React.FC<Props> = () => {
  const initialValues: DoctorCabinetInfoForm = {
    services: [],
    images: [],
    addressForm: {
      address: '',
      state: undefined,
      city: undefined,
    },
    location: {
      lat: 0,
      lng: 0,
    },
  };

  const [data, setData] = useState(initialValues);

  const hanldeUpdateServices = (services: Service[]) => {
    setData({ ...data, services });
  };

  return (
    <div style={{ padding: '24px 80px' }}>
      <Spacer direction="vertical" size="md">
        <Services services={data.services} updateServices={hanldeUpdateServices} />
        <Address addressForm={data.addressForm} />
        <Map location={data.location} />
        <Images images={data.images} />
      </Spacer>
    </div>
  );
};

export default CabinetInfo;
