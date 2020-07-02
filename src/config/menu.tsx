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
    FundOutlined,
} from '@ant-design/icons';
import { MenuItem } from '../layouts/main/components/main-menu';


export const menuData: MenuItem[] = [
    {
        key: 'welcome',
        text: '欢迎',
        icon: <SmileOutlined />,
        link: '/main/welcome',
    }, {
        key: 'project',
        text: '项目管理',
        icon: <UploadOutlined />,
        link: '/main/project',
    }, {
        key: 'MENU_ITEM_SYSTEM_ACCOUNT',
        text: '账号管理',
        icon: <LockOutlined />,
        children: [{
            key: 'MENU_ITEM_SYSTEM_ACCOUNT_USER',
            text: '用户',
            icon: <UserOutlined />,
            link: '/main/user',
        }, {
            key: 'MENU_ITEM_SYSTEM_ACCOUNT_ROLE',
            text: '角色',
            icon: <TeamOutlined />,
            link: '/main/role',
        },
        {
            key: 'MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY',
            text: '权限',
            icon: <UsergroupAddOutlined />,
            link: '/main/authority',
        }
        ]
    }, {
        key: 'MENU_ITEM_NOTICE',
        text: '系统设置',
        icon: <SettingOutlined />,
        link: '/main/settings'
    },
];