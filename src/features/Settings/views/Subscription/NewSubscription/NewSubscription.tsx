import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Text, Modal, Icon } from '../../../../../components';
import ChoicePlanCard from '../../../components/ChoicePlanCard/ChoicePlanCard';
import PaymentMethods from './PaymentMethods/PaymentMethods';
import { PaymentType, SubscriptionPlan } from '../../../types';
import { useGetPaymentMethods } from '../../../hooks/useGetPaymentMethods';

type Props = {
    plans: SubscriptionPlan[],
    visible: boolean,
    setVisible: (visible: boolean) => void,
    addSubscription: ({ planId, paymentMethodId, paymentInfo }: {
        planId: string, paymentMethodId?: string | undefined;
        paymentInfo?: any;
    }) => Promise<any>,
};


const NewSubscription: React.FC<Props> = ({ visible, setVisible, plans, addSubscription }) => {
    const { t } = useTranslation('translation');
    const [selectedPlan, setSelectedPlan] = React.useState<null | SubscriptionPlan>(null);// selected plan for new subscription
    const { methods } = useGetPaymentMethods();
    const [selectedMethod, setSelectedMethod] = React.useState<PaymentType | undefined>(undefined);// selected methods for payment

    const validationSchema = Yup.object().shape({
        nif: Yup.string().required(t('errors:required field')),
        numArticle: Yup.string().required(t('errors:required field')),
        rc: Yup.string(),
        agreementNumber: Yup.string().nullable(),
        nis: Yup.string(),

    });

    const formik = useFormik({
        initialValues: { nif: '', numArticle: '', rc: null, agreementNumber: null, nis: '' },
        enableReinitialize: true,
        validationSchema,
        validateOnChange: false,
        onSubmit: async (item: any) => {
            try {
                await addSubscription({
                    planId: selectedPlan!.id,
                    paymentMethodId: selectedMethod?.id,
                    paymentInfo: item
                });
                setVisible(false);

            } catch (error) {
                console.log('error catch', error);
                setSelectedPlan(null);
                setVisible(false);
            }
        }
    });


    const addFreeTrial = async () => {
        try {
            await addSubscription({ planId: selectedPlan!.id });
            setSelectedPlan(null);
        } catch (error) {
            console.log('error catch', error);
            setSelectedPlan(null);

        }
    };


    // Effects

    React.useEffect(() => {
        if (!selectedMethod) setSelectedMethod(methods?.data && methods?.data[0]);
    }, [methods]);

    React.useEffect(() => {
        if (selectedPlan?.title === 'FREE TRIAL') {
            setVisible(false);
            addFreeTrial();
        }
    }, [selectedPlan]);

    React.useEffect(() => {
        setSelectedPlan(null);
        formik.resetForm();
        setSelectedMethod(methods?.data && methods?.data[0]);
    }, [visible]);



    const CustomTitle = () => (
        selectedPlan ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button type="button" style={{ background: '#F5F7FB', borderRadius: 4, display: 'flex', alignItems: 'center', border: '1px solid #f5f7fb' }} onClick={() => setSelectedPlan(null)}>
                    <Icon name="arrow-left-line" style={{ color: '#273151', fontSize: 17 }} />
                </button>
                <span style={{ marginLeft: 16, marginRight: 16 }}>
                    {t('payment')}
                </span>
                <span style={{ marginLeft: 16, marginRight: 16, display: 'flex', flexDirection: 'row', fontWeight: 'bold', fontSize: 12, color: '#fff', justifyContent: 'center', alignItems: 'center', padding: '4px 6px', width: 111, height: 24, background: '#273151', borderRadius: 2 }}>
                    {selectedPlan.title}
                </span>
            </div>

        ) : (
            <>
                {t('change subscription plan')}
            </>
        )
    );

    return (
        <Modal title={CustomTitle()} visible={visible} width={1000} onCancel={() => setVisible(false)}>
            {
                !selectedPlan ? (
                    /* step 0 choosing plan */
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 40 }}>
                        <Text style={{ fontSize: '14px', color: '#74798C', marginTop: 45 }}>{t('select subscription plan')}</Text>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 37 }}>
                            {
                                plans && plans.map((plan: SubscriptionPlan) => (
                                    <ChoicePlanCard 
                                      selectChoice={setSelectedPlan} 
                                      key={`plan-${plan.title}`} 
                                      plan={plan} 
                                    />

                                ))
                            }

                        </div>
                    </div>
                ) : (
                    /* step 1 payment method */
                    <PaymentMethods
                      formik={formik}
                      methods={methods?.data}
                      selectMethod={setSelectedMethod}
                      selectedMethod={selectedMethod}
                    />
                )
            }
        </Modal>
    );
};

export default NewSubscription;
