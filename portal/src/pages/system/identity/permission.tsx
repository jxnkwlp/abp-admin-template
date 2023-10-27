import { getPermissions, updatePermissions } from '@/services/Permissions';
import { API } from '@/services/typings';
import { formatMessage, useIntl } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Modal, Tree, message } from 'antd';
import { DataNode } from 'antd/es/tree';
import React, { useState } from 'react';

const loopPermissions = (permissions: API.PermissionGrantInfo[], parentName?: string) => {
    const nodes: DataNode[] = [];
    const granteds: string[] = [];
    permissions
        .filter((x) => x.parentName == parentName)
        .forEach((item) => {
            const node: DataNode = {
                title: item.displayName,
                key: item.name!,
                children: [],
            };
            if (item.isGranted) granteds.push(item.name!);

            // childs
            const childs = permissions.filter((x) => x.parentName == item.name);
            if (childs.length > 0) {
                // remove parent
                // if (item.isGranted) granteds.pop();

                const childPermissions = loopPermissions(permissions, item.name);
                node.children = childPermissions.nodes;
                // // if child all grant, add parent
                // if (childs.length == childs.filter((x) => x.isGranted).length) {
                //     granteds.push(item.name!);
                // }
                granteds.push(...childPermissions.granteds!);
            }
            //
            nodes.push(node);
        });
    return { nodes, granteds: granteds };
};

const loopGroup = (groups: API.PermissionGroup[]) => {
    const nodes: DataNode[] = [];
    const granteds: string[] = [];
    groups.forEach((group) => {
        if (group.permissions!.length > 0) {
            const permissions = loopPermissions(group.permissions ?? [], undefined);
            nodes.push({ title: group.displayName, key: group.name!, children: permissions.nodes });
            if (permissions.granteds.length > 0) {
                granteds.push(group.name!);
            }
            granteds.push(...permissions.granteds);
        }
    });

    return { nodes, granted: granteds };
};

type PermissionType = API.PermissionGrantInfo & {
    groupName: string;
};

export const PermissionForm: React.FC<{
    providerName?: string;
    providerKey?: string;
    open?: boolean;
    onOpenChange?: any;
    title?: string;
}> = ({ providerName: providerName, providerKey: providerKey, open, onOpenChange, title }) => {
    const intl = useIntl();

    const [loading, setLoading] = useState<boolean>(false);
    const [title2, setTitle2] = useState('');
    const [data, setData] = useState<DataNode[]>();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    // const [halfCheckedKeys, setHalfCheckedKeys] = useState<string[]>([]);
    const [allNames, setAllNames] = useState<string[]>([]);

    const [flatPermissions, setFlatPermissions] = useState<PermissionType[]>([]);

    const load = async () => {
        setLoading(true);
        const data = await getPermissions({
            providerName: providerName,
            providerKey: providerKey,
        });

        if (data == null) {
            onOpenChange?.(false);
            return;
        }

        setLoading(false);

        setTitle2(title ?? data.entityDisplayName!);

        const allPermissions = data
            .groups!.filter((x) => x.permissions)
            .flatMap((x) => [
                ...x.permissions!.map((p) => {
                    return { ...p, parentName: !p.parentName ? x.name : p.parentName, groupName: x.name } as PermissionType;
                }),
                { name: x.name, groupName: x.name } as PermissionType,
            ]);

        setFlatPermissions(allPermissions);
        setAllNames(allPermissions.map((x) => x.name!));

        const permissions = loopGroup(data.groups ?? []);

        setData(permissions.nodes);
        setSelectedKeys(permissions.granted);
    };

    const onCheck = ({ checked }: { checked: React.Key[] }, e: any) => {
        const pName = e.node.key as unknown as string;
        let selectKeys = [...checked.map((x) => x.toString())];
        const p = flatPermissions.find((x) => x.name == pName);
        const childs = flatPermissions.filter((x) => x.parentName == pName).map((x) => x.name!); //allNames.filter((x) => x.startsWith(pName + '.'));
        if (e.checked) {
            // parent
            if (p != null) {
                selectKeys.push(p.groupName!);
                if (p.parentName) selectKeys.push(p.parentName!);
            }

            // child
            selectKeys.push(...childs);
        } else {
            // child
            selectKeys = selectKeys.filter((x) => childs.indexOf(x) == -1);
        }
        setSelectedKeys([...new Set(selectKeys)]);
    };

    const handleSave = async () => {
        setLoading(true);
        const keys = selectedKeys;
        const data = allNames?.map((x) => {
            return {
                name: x,
                isGranted: keys.indexOf(x) >= 0,
            };
        });
        const result = await updatePermissions(
            { providerName: providerName, providerKey: providerKey },
            {
                permissions: data,
            },
        );

        setLoading(false);

        if (!result?.data) {
            message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
            onOpenChange?.(false);
        }
    };

    useAsyncEffect(async () => {
        if (open && providerName && providerKey) {
            await load();
        }
    }, [providerName, providerKey, open]);

    return (
        <>
            <Modal
                title={title2}
                open={open}
                destroyOnClose
                maskClosable={false}
                onCancel={() => {
                    onOpenChange?.(false);
                }}
                onOk={() => {
                    handleSave();
                }}
                confirmLoading={loading}
            >
                <Tree
                    checkable
                    checkStrictly
                    selectable={false}
                    treeData={data}
                    checkedKeys={selectedKeys}
                    defaultExpandedKeys={[]}
                    onCheck={onCheck}
                ></Tree>
            </Modal>
        </>
    );
};
