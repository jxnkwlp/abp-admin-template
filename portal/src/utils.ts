export type LoopItemType = {
    id: string;
    children?: LoopItemType[];
};

export function loopListToTree<T extends LoopItemType>(
    data: T[],
    filter: (item: T, key?: string) => boolean,
    itemAction?: (item: T, key?: string) => void,
    key?: string,
) {
    const list = data
        .filter((x) => filter(x, key))
        .map((x) => {
            if (itemAction) {
                itemAction(x, key);
            }
            return x;
        });

    list.forEach((item) => {
        item.children = loopListToTree(data, filter, itemAction, item.id);
    });

    return list;
}
