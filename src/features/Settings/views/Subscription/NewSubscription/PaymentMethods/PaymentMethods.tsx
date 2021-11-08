import React from 'react';
import { FormikProps } from 'formik';
import { Radio, Input, Button } from 'antd';
import { Text, Label } from '../../../../../../components';
import PaymentMethodChoice from '../../../../components/PaymentMethodChoice/PaymentMethodChoice';
import { PaymentType } from '../../../../types';


type Props = {
    formik: FormikProps<any>,
    methods: PaymentType[] | undefined,
    selectMethod: (method: PaymentType) => void,
    selectedMethod: PaymentType|undefined
};




const PaymentMethods: React.FC<Props> = ({ formik, methods, selectMethod, selectedMethod }) => {
    const [isRC, setIsRC] = React.useState<'rc' | 'an'>('rc');
    return (
        <div style={{ padding: '30px 80px' }}>
            <Text style={{ fontSize: 12, color: '#74798C' }}>Select payment method </Text>
            {/* Payment types */}
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 16, justifyContent: 'space-between' }}>
                {
                    methods?.map(method => (
                        <PaymentMethodChoice {...method} key={`payment-method-${method.id}`} isActive={selectedMethod?.id === method.id} onClick={() => selectMethod(method)} />
                    ))
                }
            </div>
            {/* Payment form */}
            <form style={{ marginTop: 21 }} onSubmit={formik.handleSubmit}>
                <Text style={{ fontSize: 12, color: '#74798c' }}>Enter your tax info</Text>
                <div style={{ marginBottom: 16, marginTop: 16 }}>
                    <Label required title="Numero d'Identification Fiscale (NIF)" error={formik.errors.nif?.toString()} />
                    <Input required name="nif" placeholder="Enter NIF number" value={formik.values.nif} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Label required title="N° Article (AI)" error={formik.errors.numArticle?.toString()} />
                    <Input required name="numArticle" placeholder="Enter AI number" value={formik.values.numArticle} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                </div>
                <Radio.Group value={isRC} onChange={(e) => setIsRC(e.target.value)} style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Radio value="rc" style={{ flex: 1, marginRight: 20 }}><Label required={isRC === 'rc'} title="RC" /></Radio>
                    <Radio value="an" style={{ flex: 1, marginLeft: 20 }}><Label required={isRC === 'an'} title="Agreement Number" /></Radio>
                </Radio.Group>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, marginRight: 20 }}>
                        <Input required={isRC === 'rc'} disabled={isRC === 'an'} name="rc" placeholder="Enter RC number" value={formik.values.rc} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    </div>
                    <div style={{ flex: 1, marginLeft: 20 }}>
                        <Input required={isRC === 'an'} disabled={isRC === 'rc'} name="agreementNumber" placeholder="Enter Agreement number" value={formik.values.agreementNumber} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Label title="NIS" />
                    <Input name="nis" placeholder="Enter NIS number" onBlur={formik.handleBlur} onChange={formik.handleChange} />
                </div>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Valider
                </Button>

            </form>
        </div>
    );
};
export default PaymentMethods;
