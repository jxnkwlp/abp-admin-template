import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ProSchemaValueEnumType } from '@ant-design/pro-components';
import { ReactNode } from 'react';

export const trueOrfalseEnum: Record<string, ProSchemaValueEnumType | ReactNode> = {
    true: { text: <CheckCircleTwoTone twoToneColor="#52c41a" /> },
    false: { text: <CloseCircleTwoTone twoToneColor="#eb2f96" /> },
};
