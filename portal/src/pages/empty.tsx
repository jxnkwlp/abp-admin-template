import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card } from 'antd';
import React from 'react';

const Index: React.FC = () => {
    return (
        <PageContainer>
            <Card>
                <Alert type="warning" message="TODO"></Alert>
            </Card>
        </PageContainer>
    );
};

export default Index;
