import { FormikProps } from 'formik';
import React from 'react';
import Spacer from '../../../../components/Spacer/Spacer';
import { DoctorCabinetInfoForm, Service, AddressForm } from '../types';
import Address from './Address/Address';
import Images from './Images/Images';
import Map from './Map/Map';
import Services from './Services/Services';

type Props = {
  data: DoctorCabinetInfoForm;
  formik: FormikProps<AddressForm>;
  handleUpdateData: (values: DoctorCabinetInfoForm) => void;
};

const CabinetInfo: React.FC<Props> = ({ data, formik, handleUpdateData }) => {
  const hanldeUpdateServices = (services: Service[]) => {
    handleUpdateData({ ...data, services });
  };

  const handleUpdateAdress = (values: AddressForm) => {
    handleUpdateData({ ...data, addressForm: values });
  };

  return (
    <div style={{ padding: '24px 80px' }}>
      <Spacer direction="vertical" size="md">
        <Services services={data.services} updateServices={hanldeUpdateServices} />
        <Address data={data.addressForm} formik={formik} handleUpdateData={handleUpdateAdress} />
        <Map location={data.location} />
        <Images images={data.images} />
      </Spacer>
    </div>
  );
};

export default CabinetInfo;
