import { FormikProps } from 'formik';
import React from 'react';
import Spacer from '../../../../components/Spacer/Spacer';
import { DoctorCabinetInfoForm, Service, CabinetForm } from '../types';
import CabinetInfoForm from './CabinetInfoForm/CabinetInfoForm';
import Images from './Images/Images';
import Map from './Map/Map';
import Services from './Services/Services';

type Props = {
  data: DoctorCabinetInfoForm;
  formik: FormikProps<CabinetForm>;
  handleUpdateData: (values: DoctorCabinetInfoForm) => void;
};

const CabinetInfo: React.FC<Props> = ({ data, formik, handleUpdateData }) => {
  const hanldeUpdateServices = (services: Service[]) => {
    handleUpdateData({ ...data, services });
  };

  const handleUpdateAdress = (values: CabinetForm) => {
    handleUpdateData({ ...data, cabinetForm: values });
  };

  return (
    <div style={{ padding: '24px 80px' }}>
      <Spacer direction="vertical" size="md">
        <Services services={data.services} updateServices={hanldeUpdateServices} />
        <CabinetInfoForm
          data={data.cabinetForm}
          formik={formik}
          handleUpdateData={handleUpdateAdress}
        />
        <Map location={data.location} />
        <Images images={data.images} />
      </Spacer>
    </div>
  );
};

export default CabinetInfo;
