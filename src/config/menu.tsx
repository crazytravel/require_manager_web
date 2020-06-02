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
    LockOutlined,
} from '@ant-design/icons';
import { MenuItem } from '../layouts/devops/components/menu';


export const menuData: MenuItem[] = [
    {
        key: 'MENU_ITEM_WELCOME',
        text: 'Welcome',
        icon: <SmileOutlined />,
        link: '/main/welcome',
    }, {
        key: 'MENU_ITEM_SYSTEM',
        text: 'System',
        icon: <SettingOutlined />,
        children: [{
            key: 'MENU_ITEM_SYSTEM_SUBSYSTEM',
            text: 'Subsystem',
            icon: <AppstoreOutlined />,
            link: '/main/system/subsystem',
        }, {
            key: 'MENU_ITEM_SYSTEM_ACCOUNT',
            text: 'Account',
            icon: <LockOutlined />,
            children: [{
                key: 'MENU_ITEM_SYSTEM_ACCOUNT_USER',
                text: 'User',
                icon: <UserOutlined />,
                link: '/main/system/user',
            }, {
                key: 'MENU_ITEM_SYSTEM_ACCOUNT_ROLE',
                text: 'Role',
                icon: <TeamOutlined />,
                link: '/main/system/role',
            },
            //  {
            //     key: 'MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY',
            //     text: 'Authority',
            //     icon: <UsergroupAddOutlined />,
            //     link: '/main/system/authority',
            // }
        ]
        }]
    }, {
        key: 'MENU_ITEM_VERSION',
        text: 'Version',
        icon: <UploadOutlined />,
        link: '/main/version',
    }, {
        key: 'MENU_ITEM_LEGAL',
        text: 'Legal',
        icon: <SafetyCertificateOutlined />,
        link: '/main/legal'
    }, {
        key: 'MENU_ITEM_GATEWAY',
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
        text: 'Notice',
        icon: <WarningOutlined />,
        link: '/main/notice'
    },
];