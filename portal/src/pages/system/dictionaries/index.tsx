import { trueOrfalseEnum } from '@/pages/common';
import {
    createDictionaryGroup,
    deleteDictionaryGroup,
    getAllDictionaryGroupList,
    getDictionaryGroup,
    getDictionaryGroupList,
    updateDictionaryGroup,
} from '@/services/DictionaryGroup';
import {
    createDictionaryItem,
    updateDictionaryItem,
    deleteDictionaryItem,
    getDictionaryItemList,
    getDictionaryItem,
} from '@/services/DictionaryItem';
import { API } from '@/services/typings';
import { LoopItemType, loopListToTree } from '@/utils';
import { DeleteOutlined, EditOutlined, FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
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
import { formatMessage, useIntl, useAccess } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Button, Card, Col, Modal, Popconfirm, Row, Space, Tag, Tree, Typography, message } from 'antd';
import { DataNode } from 'antd/es/tree';
import { TreeNode } from 'antd/es/tree-select';
import React, { useEffect, useRef, useState } from 'react';

const handleDictionaryGroupAdd = async (data: any) => {
    const response = await createDictionaryGroup(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleDictionaryGroupEdit = async (id: string, data: any) => {
    const response = await updateDictionaryGroup(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleDictionaryGroupDelete = async (id: string) => {
    const response = await deleteDictionaryGroup(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const handleDictionaryItemAdd = async (data: any) => {
    const response = await createDictionaryItem(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleDictionaryItemEdit = async (id: string, data: any) => {
    const response = await updateDictionaryItem(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleDictionaryItemDelete = async (id: string) => {
    const response = await deleteDictionaryItem(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const TreeTitle: React.FC<{
    id: string;
    title: string;
    public?: boolean;
    onAdd?: (key: string) => Promise<void>;
    onEdit?: (key: string) => Promise<void>;
    onDelete?: (key: string) => Promise<void>;
}> = (props) => {
    return (
        <span
            className="title_wrapper"
            style={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center' }}
            title={props.id}
        >
            <Space>
                <Typography.Text copyable>{props.title}</Typography.Text>
                {props.public && <Tag color="blue">{formatMessage({ id: 'page.dictionaryGroup.public' })}</Tag>}
                <span
                    onClick={async (e) => {
                        e.stopPropagation();
                        await props?.onEdit?.(props.id);
                    }}
                >
                    <EditOutlined />
                </span>
                <span
                    onClick={async (e) => {
                        e.stopPropagation();
                        await props?.onDelete?.(props.id);
                    }}
                >
                    <DeleteOutlined />
                </span>
                <span
                    onClick={async (e) => {
                        e.stopPropagation();
                        await props?.onAdd?.(props.id);
                    }}
                >
                    <PlusOutlined />
                </span>
            </Space>
        </span>
    );
};

const DictionaryItem: React.FC = () => {
    const intl = useIntl();
    const access = useAccess();

    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const [editItemModalVisible, setEditItemModalVisible] = useState<boolean>(false);
    const [editItemModalTitle, setEditItemModalTitle] = useState<string>('');
    const [editItemModalData, setEditItemModalData] = useState<API.DictionaryItem>();
    const [editItemModalDataId, setEditItemModalDataId] = useState<string>();

    const [editGroupModalVisible, setEditGroupModalVisible] = useState<boolean>(false);
    const [editGroupModalTitle, setEditGroupModalTitle] = useState<string>('');
    const [editGroupModalData, setEditGroupModalData] = useState<API.DictionaryGroup>();
    const [editGroupModalDataId, setEditGroupModalDataId] = useState<string>();

    const [selectGroupName, setSelectGroupName] = useState<string>();

    const [groupList, setGroupList] = useState<DataNode[]>([]);

    const handleOnGroupEdit = async (key: string) => {
        const result = await getDictionaryGroup(key);
        if (result) {
            setEditGroupModalData(result);
            setEditGroupModalDataId(key);
            setEditGroupModalVisible(true);
            setEditGroupModalTitle(`${intl.formatMessage({ id: 'common.dict.edit' })} - ${result.displayName}`);
        }
    };

    const handleOnGroupDelete = async (key: string) => {
        Modal.confirm({
            title: intl.formatMessage({
                id: 'common.dict.delete.confirm',
            }),
            onOk: async () => {
                if (await handleDictionaryGroupDelete(key)) {
                    await loadGroups();
                }
            },
        });
    };

    const handleOnGroupAdd = async (key: string) => {
        setEditGroupModalData({ parentName: key } as API.DictionaryGroup);
        setEditGroupModalDataId(undefined);
        setEditGroupModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
        setEditGroupModalVisible(true);
    };

    const loadGroups = async () => {
        const result = await getAllDictionaryGroupList();

        const treeData = loopListToTree<API.DictionaryGroup & LoopItemType & Record<string, any>>(
            (result?.items ?? []).map((x) => {
                return { ...x, id: x.name, children: [] };
            }) as unknown as LoopItemType[],
            (item, key) => item.parentName == key,
            // (item) => <Tree.TreeNode key={item.id} title={item.id!}></Tree.TreeNode>,
            (item) => {
                item.key = item.name;
                item.title = (
                    <TreeTitle
                        title={item.displayName!}
                        id={item.name!}
                        key={item.id}
                        public={item.isPublic}
                        onEdit={handleOnGroupEdit}
                        onDelete={handleOnGroupDelete}
                        onAdd={handleOnGroupAdd}
                    />
                );
                // item.title = item.displayName;
            },
        );
        setGroupList(treeData as unknown as DataNode[]);
    };

    useAsyncEffect(async () => {
        await loadGroups();
    }, []);

    return (
        <PageContainer>
            <Row gutter={24}>
                <Col span={8}>
                    <Card
                        title={intl.formatMessage({ id: 'page.dictionaryGroup' })}
                        extra={
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setEditGroupModalDataId(undefined);
                                        setEditGroupModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
                                        setEditGroupModalVisible(true);
                                    }}
                                >
                                    {intl.formatMessage({ id: 'common.dict.create' })}
                                </Button>
                            </Space>
                        }
                    >
                        <Tree.DirectoryTree
                            treeData={groupList}
                            onSelect={(selectKeys) => {
                                setSelectGroupName(selectKeys[0] as string);
                            }}
                        ></Tree.DirectoryTree>
                    </Card>
                </Col>
                <Col span={16}>
                    {selectGroupName && (
                        <ProTable<API.DictionaryItem>
                            actionRef={tableActionRef}
                            columns={[
                                {
                                    dataIndex: 'name',
                                    title: intl.formatMessage({ id: 'page.dictionaryItem.field.name' }),
                                    search: false,
                                    copyable: true,
                                },
                                {
                                    dataIndex: 'displayName',
                                    title: intl.formatMessage({ id: 'page.dictionaryItem.field.displayName' }),
                                    search: false,
                                    copyable: true,
                                },
                                {
                                    dataIndex: 'isEnabled',
                                    title: intl.formatMessage({ id: 'page.dictionaryItem.field.isEnabled' }),
                                    search: false,
                                    valueEnum: trueOrfalseEnum,
                                    align: 'center',
                                },
                                {
                                    dataIndex: 'description',
                                    title: intl.formatMessage({ id: 'page.dictionaryItem.field.description' }),
                                    search: false,
                                    ellipsis: true,
                                },
                                {
                                    dataIndex: 'displayOrder',
                                    title: intl.formatMessage({ id: 'page.dictionaryItem.field.displayOrder' }),
                                    search: false,
                                },
                                {
                                    title: intl.formatMessage({ id: 'common.dict.table-action' }),
                                    valueType: 'option',
                                    align: 'center',
                                    width: 80,
                                    render: (text, record, _, action) => [
                                        <a
                                            key="edit"
                                            onClick={() => {
                                                setEditItemModalData(record);
                                                setEditItemModalDataId(record.name);
                                                setEditItemModalVisible(true);
                                                setEditItemModalTitle(
                                                    `${intl.formatMessage({ id: 'common.dict.edit' })} - ${record.name}`,
                                                );
                                            }}
                                        >
                                            {intl.formatMessage({ id: 'common.dict.edit' })}
                                        </a>,
                                        <Popconfirm
                                            key="delete"
                                            title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                            onConfirm={async () => {
                                                if (await handleDictionaryItemDelete(record.name!)) {
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
                            search={false}
                            params={{ groupName: selectGroupName }}
                            toolBarRender={() => [
                                <Button
                                    key="add"
                                    type="primary"
                                    onClick={() => {
                                        setEditItemModalData(undefined);
                                        setEditItemModalDataId('');
                                        setEditItemModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
                                        setEditItemModalVisible(true);
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
                                const result = await getDictionaryItemList({
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
                    )}
                </Col>
            </Row>

            {/* 'Dictionary Item' Create/Update */}
            <ModalForm
                title={editItemModalTitle}
                width={580}
                open={editItemModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditItemModalVisible}
                request={async () => {
                    if (!editItemModalDataId) return { displayOrder: 100, isEnabled: true };
                    return await getDictionaryItem(editItemModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editItemModalDataId) {
                        success = await handleDictionaryItemEdit(
                            editItemModalDataId,
                            Object.assign(editItemModalData ?? {}, value, { groupName: selectGroupName! }),
                        );
                    } else {
                        success = await handleDictionaryItemAdd(
                            Object.assign(editItemModalData ?? {}, value, { groupName: selectGroupName! }),
                        );
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
                    rules={[{ required: true }, { max: 32 }]}
                    name={['name']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.name' })}
                    disabled={!!editItemModalDataId}
                />
                <ProFormText
                    rules={[{ required: true }, { max: 64 }]}
                    name={['displayName']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.displayName' })}
                />
                <ProFormDigit
                    rules={[{ required: true }]}
                    name={['displayOrder']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.displayOrder' })}
                    fieldProps={{ precision: 0 }}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['isEnabled']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.isEnabled' })}
                />
                <ProFormTextArea
                    rules={[{ required: false }]}
                    name={['description']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.description' })}
                    fieldProps={{ rows: 2 }}
                />
                <ProFormTextArea
                    rules={[{ required: false }]}
                    name={['value']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.value' })}
                    fieldProps={{ rows: 4 }}
                />
            </ModalForm>

            {/* 'Dictionary Group' Create/Update */}
            <ModalForm
                title={editGroupModalTitle}
                width={580}
                open={editGroupModalVisible}
                onOpenChange={setEditGroupModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                request={async () => {
                    if (!editGroupModalDataId) return {};
                    return await getDictionaryGroup(editGroupModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editGroupModalDataId) {
                        success = await handleDictionaryGroupEdit(editGroupModalDataId, data);
                    } else {
                        success = await handleDictionaryGroupAdd({ ...editGroupModalData, ...data });
                    }

                    if (success) {
                        await loadGroups();
                    }

                    return success;
                }}
                layout="horizontal"
                labelCol={{ span: 6 }}
                labelWrap
            >
                <ProFormText
                    rules={[{ required: true }, { max: 64 }]}
                    name={['name']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.name' })}
                    disabled={!!editGroupModalDataId}
                />
                <ProFormText
                    rules={[{ required: true }, { max: 128 }]}
                    name={['displayName']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.displayName' })}
                />
                <ProFormTextArea
                    rules={[{ required: false }, { max: 256 }]}
                    name={['description']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.description' })}
                    fieldProps={{ rows: 2 }}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['isPublic']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.isPublic' })}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default DictionaryItem;
