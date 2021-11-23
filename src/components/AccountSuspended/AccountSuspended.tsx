import React from 'react';
import { Typography } from 'antd';
import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';
import error from '../../assets/img/error.png';

export default function AccountSuspended() {


    const { Title, Paragraph, Text } = Typography;
    return (
        <div style={{ padding: '24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={error} alt="" />
            <Title style={{ marginTop: 32, fontSize: 24 }}>Account Suspended</Title>
            <Paragraph style={{ textAlign: 'center', fontSize: 16, marginBottom: 20 }}>
                We are sorry, your account has been suspended.<br /> Please contact support so we can help you restore your account.
            </Paragraph>
            <Text style={{ marginBottom: 5 }}>
                <PhoneTwoTone style={{ fontSize: '16px' }} rotate={120} />
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    +213 982 41 12 22
                </span>
            </Text>
            <Text>
                <MailTwoTone style={{ fontSize: '16px' }} />
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    hello@docta.io
                </span>
            </Text>
        </div>
    );
}
