import { trueOrfalseEnum } from '@/pages/common';
import {
    createIdentityClaimType,
    deleteIdentityClaimType,
    getIdentityClaimTypeList,
    updateIdentityClaimType,
} from '@/services/IdentityClaimType';
import { getIdentityClientList } from '@/services/IdentityClient';
import { IdentityClaimValueType } from '@/services/enums';
import { API } from '@/services/typings';
import { enumToOptions } from '@/services/untils';
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProFormDigit,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea,
    ProFormDatePicker,
    ProTable,
} from '@ant-design/pro-components';
import { formatMessage, useIntl } from '@umijs/max';
import { Button, Card, Popconfirm, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const handleIdentityClaimTypeAdd = async (data: any) => {
    const response = await createIdentityClaimType(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleIdentityClaimTypeEdit = async (id: string, data: any) => {
    const response = await updateIdentityClaimType(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleIdentityClaimTypeDelete = async (id: string) => {
    const response = await deleteIdentityClaimType(id);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const IdentityClaimType: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const intl = useIntl();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.IdentityClaimType>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    return (
        <PageContainer>
            <ProTable<API.IdentityClaimType>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'filter',
                        title: intl.formatMessage({ id: 'common.dict.filter' }),
                        hideInTable: true,
                    },
                    {
                        dataIndex: 'name',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.name' }),
                        search: false,
                    },
                    {
                        dataIndex: 'required',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.required' }),
                        search: false,
                        valueEnum: trueOrfalseEnum,
                    },
                    {
                        dataIndex: 'isStatic',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.isStatic' }),
                        search: false,
                        valueEnum: trueOrfalseEnum,
                    },
                    {
                        dataIndex: 'regex',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.regex' }),
                        search: false,
                    },
                    {
                        dataIndex: 'regexDescription',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.regexDescription' }),
                        search: false,
                    },
                    {
                        dataIndex: 'description',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.description' }),
                        search: false,
                    },
                    {
                        dataIndex: 'valueTypeAsString',
                        title: intl.formatMessage({ id: 'page.identityClaimType.field.valueType' }),
                        search: false,
                    },
                    {
                        title: intl.formatMessage({ id: 'common.dict.table-action' }),
                        valueType: 'option',
                        align: 'center',
                        width: 80,
                        render: (text, record, _, action) => [
                            <a
                                disabled={record.isStatic}
                                key="edit"
                                onClick={() => {
                                    if (record.isStatic) return;
                                    setEditModalData(record);
                                    setEditModalDataId(record.id);
                                    setEditModalVisible(true);
                                    setEditModalTitle(`${intl.formatMessage({ id: 'common.dict.edit' })} - ${record.name}`);
                                }}
                            >
                                {intl.formatMessage({ id: 'common.dict.edit' })}
                            </a>,
                            <Popconfirm
                                key="delete"
                                title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                onConfirm={async () => {
                                    if (await handleIdentityClaimTypeDelete(record.id)) {
                                        action?.reload();
                                    }
                                }}
                            >
                                <a>{intl.formatMessage({ id: 'common.dict.delete' })}</a>
                            </Popconfirm>,
                        ],
                    },
                ]}
                rowKey="id"
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        onClick={() => {
                            // @ts-ignore
                            setEditModalData({ valueType: 0 });
                            setEditModalDataId('');
                            setEditModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
                            setEditModalVisible(true);
                        }}
                    >
                        {intl.formatMessage({ id: 'common.dict.create' })}
                    </Button>,
                ]}
                request={async (params) => {
                    const { current, pageSize } = params;
                    delete params.current;
                    delete params.pageSize;
                    const skipCount = (current! - 1) * pageSize!;
                    const result = await getIdentityClaimTypeList({
                        ...params,
                        skipCount,
                        maxResultCount: pageSize,
                    });
                    if (result)
                        return {
                            success: true,
                            data: result.items,
                            total: result.totalCount,
                        };
                    else {
                        return {
                            success: false,
                        };
                    }
                }}
            />

            {/* 'Identity Claim Type' Create/Update */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleIdentityClaimTypeEdit(editModalDataId, data);
                    } else {
                        success = await handleIdentityClaimTypeAdd(data);
                    }

                    if (success) {
                        tableActionRef?.current?.reload();
                    }

                    return success;
                }}
                layout="horizontal"
                labelCol={{ span: 6 }}
                labelWrap
            >
                <ProFormText
                    rules={[{ required: true }, { max: 256 }]}
                    name="name"
                    label={intl.formatMessage({ id: 'page.identityClaimType.field.name' })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name="required"
                    label={intl.formatMessage({ id: 'page.identityClaimType.field.required' })}
                />
                {!editModalDataId && (
                    <ProFormSwitch
                        rules={[{ required: false }]}
                        name="isStatic"
                        label={intl.formatMessage({ id: 'page.identityClaimType.field.isStatic' })}
                    />
                )}
                <ProFormText
                    rules={[{ required: false }, { max: 512 }]}
                    name="regex"
                    label={intl.formatMessage({ id: 'page.identityClaimType.field.regex' })}
                />
                <ProFormText
                    rules={[{ required: false }, { max: 128 }]}
                    name="regexDescription"
                    label={intl.formatMessage({ id: 'page.identityClaimType.field.regexDescription' })}
                />
                <ProFormSelect
                    rules={[{ required: true }]}
                    name="valueType"
                    label={intl.formatMessage({ id: 'page.identityClaimType.field.valueType' })}
                    options={enumToOptions(IdentityClaimValueType)}
                />
                <ProFormText
                    rules={[{ required: false }, { max: 256 }]}
                    name="description"
                    label={intl.formatMessage({ id: 'page.identityClaimType.field.description' })}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default IdentityClaimType;
