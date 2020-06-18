import React from 'react';
import {
    ApiOutlined,
    PushpinOutlined,
    SafetyCertificateOutlined,
    SmileOutlined,
    UploadOutlined,
    UserOutlined,
    TeamOutlined,
    WarningOutlined,
    SettingOutlined,
    AppstoreOutlined,
    UsergroupAddOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { MenuItem } from '../layouts/main/components/menu';


export const menuData: MenuItem[] = [
    {
        key: 'welcome',
        text: '欢迎',
        icon: <SmileOutlined />,
        link: '/main/welcome',
    }, {
        key: 'MENU_ITEM_SYSTEM_ACCOUNT',
        text: '账户',
        icon: <LockOutlined />,
        children: [{
            key: 'MENU_ITEM_SYSTEM_ACCOUNT_USER',
            text: '用户',
            icon: <UserOutlined />,
            link: '/main/system/user',
        }, {
            key: 'MENU_ITEM_SYSTEM_ACCOUNT_ROLE',
            text: '角色',
            icon: <TeamOutlined />,
            link: '/main/system/role',
        },
             {
                key: 'MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY',
                text: '权限',
                icon: <UsergroupAddOutlined />,
                link: '/main/system/authority',
            }
        ]
    }, {
        key: 'MENU_ITEM_VERSION',
        text: '项目',
        icon: <UploadOutlined />,
        link: '/main/version',
    }, {
        key: '需求',
        text: 'Legal',
        icon: <SafetyCertificateOutlined />,
        link: '/main/legal'
    }, {
        key: '任务',
        text: 'Gateway',
        icon: <ApiOutlined />,
        link: '/main/gateway'
    }, {
        key: 'MENU_ITEM_TOGGLE',
        text: 'Toggle',
        icon: <PushpinOutlined />,
        link: '/main/toggle'
    }, {
        key: 'MENU_ITEM_NOTICE',
        text: '系统设置',
        icon: <SettingOutlined />,
        link: '/main/settings'
    },
];