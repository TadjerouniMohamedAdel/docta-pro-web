import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Text, Modal, Icon } from '../../../../../components';
import ChoicePlanCard from '../../../components/ChoicePlanCard/ChoicePlanCard';
import PaymentMethods from './PaymentMethods/PaymentMethods';
import { useGetSubscriptionPlans } from '../../../hooks/useGetSubscriptionPlans';

type Props = {
    visible: boolean,
    setVisible: (visible: boolean) => void
};


const NewSubscription: React.FC<Props> = ({ visible, setVisible }) => {
    const { t } = useTranslation('translation');
    const [selectedPlan, setSelectedPlan] = React.useState<null | { title: string, price: number }>(null);
    const { plans } = useGetSubscriptionPlans();

    React.useEffect(() => {
        if (selectedPlan?.title === 'FREE TRIAL') {
            setVisible(false);
        }
    }, [selectedPlan]);



    const validationSchema = Yup.object().shape({
        nif: Yup.string().required(t('errors:required field')),
        ai: Yup.string().required(t('errors:required field')),
        // rc: Yup.string().required(t('errors:required field')),
        agreementNumber: Yup.string().required(t('errors:required field')),
        nis: Yup.string(),

    });

    const formik = useFormik({
        initialValues: { nif: '', ai: '', rc: null, agreementNumber: null, nis: '' },
        enableReinitialize: true,
        validationSchema,
        validateOnChange: false,
        onSubmit: async () => { }
    });

    const CustomTitle = () => (
        selectedPlan ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button type="button" style={{ background: '#F5F7FB', borderRadius: 4, display: 'flex', alignItems: 'center', border: '1px solid #f5f7fb' }} onClick={() => setSelectedPlan(null)}>
                    <Icon name="arrow-left-line" style={{ color: '#273151', fontSize: 17 }} />
                </button>
                <span style={{ marginLeft: 16, marginRight: 16 }}>
                    {t('Payment')}
                </span>
                <span style={{ marginLeft: 16, marginRight: 16, display: 'flex', flexDirection: 'row', fontWeight: 'bold', fontSize: 12, color: '#fff', justifyContent: 'center', alignItems: 'center', padding: '4px 6px', width: 111, height: 24, background: '#273151', borderRadius: 2 }}>
                    {selectedPlan.title}
                </span>
            </div>

        ) : (
            <>
                {t('Change subscription plan')}
            </>
        )
    );

    return (
        <Modal title={CustomTitle()} visible={visible} width={1000} onCancel={() => setVisible(false)}>
            {
                !selectedPlan ? (
                    /* step 0 choosing plan */
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 40 }}>
                        <Text style={{ fontSize: '14px', color: '#74798C', marginTop: 45 }}>Select subscription plan</Text>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 37 }}>
                            {
                                plans?.data && plans?.data.map((plan: any) => (
                                    <ChoicePlanCard selectChoice={setSelectedPlan} key={`plan-${plan.title}`} plan={plan} />

                                ))
                            }

                        </div>
                    </div>
                ) : (
                    /* step 1 payment method */
                    <PaymentMethods formik={formik} />
                )
            }
        </Modal>
    );
};

export default NewSubscription;
