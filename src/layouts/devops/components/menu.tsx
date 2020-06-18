import React, { ReactElement, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from '../../../contexts/session-context';

export interface MenuItem {
    key: string;
    text: string;
    icon: ReactElement;
    link?: string;
    children?: MenuItem[];
}

export interface MenuItemWithParent {
    item: MenuItem;
    parentKey?: string;
}
export type MenuMap = Record<string, MenuItemWithParent>;

interface MainMenuProps {
    menuData: MenuItem[];
    selectCallback: (item: MenuItem) => void
}


const MainMenu: React.FC<MainMenuProps> = ({
    menuData,
    selectCallback }) => {
    const openedKeys: string[] = [];
    const menuMap: MenuMap = {};

    let location = useLocation();
    const currentPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    findParentsByKey(menuData, menuMap, currentPath, openedKeys);

    const [selectedKeys, setSelectedKeys] = useState<string[]>();
    const auth = useSession();
    


    useEffect(() => {
        const currentPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        setSelectedKeys([currentPath]);
        const item = findItemByKey(menuData, currentPath);
        if (item) {
            selectCallback(item);
        }
    }, [location, menuData, selectCallback]);

    const recursion = (data: MenuItem[]) => {
        return (
            data.map(item => {
                if (!auth.session.authorities?.includes(item.key)) {
                    return null;
                }
                if (item.children) {
                    return (
                        <Menu.SubMenu key={item.key} title={<span>{item.icon}<span>{item.text}</span></span>}>
                            {recursion(item.children)}
                        </Menu.SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.link!}>{item.icon}<span>{item.text}</span></Link>
                        </Menu.Item>
                    )
                }
            })
        )
    }

    return (
        <Menu theme="dark" mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={openedKeys}>
            {recursion(menuData)}
        </Menu>
    )
}


const findItemByKey = (menuData: MenuItem[], key: string): (MenuItem | undefined) => {
    var currentSelectedMenu: MenuItem | undefined;
    for (const item of menuData) {
        if (key === item.key) {
            currentSelectedMenu = item;
            break;
        }
        if (item.children) {
            currentSelectedMenu = findItemByKey(item.children, key);
        }
    }
    return currentSelectedMenu;
}


const separateList2Map = (menuData: MenuItem[], data: MenuMap, parentKey?: string) => {
    menuData.forEach(item => {
        data[item.key] = { item, parentKey };
        if (item.children) {
            separateList2Map(item.children, data, item.key);
        }
    })
}

const findParentsByKey = (menuData: MenuItem[], menuMap: MenuMap, key: string, parentKeys: string[]) => {
    separateList2Map(menuData, menuMap)
    const menu = menuMap[key];
    if (menu?.parentKey) {
        parentKeys.push(menu.parentKey);
        findParentsByKey(menuData, menuMap, menu.parentKey, parentKeys);
    }
}

export default MainMenu;