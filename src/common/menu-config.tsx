import React from 'react';
import {
    SmileOutlined,
    UploadOutlined,
    UserOutlined,
    TeamOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    LockOutlined,
} from '@ant-design/icons';
import { MenuItem } from '../components/main-menu';
import { Routes } from './routes';

export const generateMenu = function(): MenuItem[] {
    return [
        {
            key: 'welcome',
            text: '欢迎',
            icon: <SmileOutlined />,
            link: Routes.main.routes.welcome.path,
        }, {
            key: 'project',
            text: '项目管理',
            icon: <UploadOutlined />,
            link: Routes.main.routes.project.path,
        }, {
            key: 'MENU_ITEM_SYSTEM_ACCOUNT',
            text: '账号管理',
            icon: <LockOutlined />,
            children: [{
                key: 'MENU_ITEM_SYSTEM_ACCOUNT_USER',
                text: '用户',
                icon: <UserOutlined />,
                link: Routes.main.routes.user.path,
            }, {
                key: 'MENU_ITEM_SYSTEM_ACCOUNT_ROLE',
                text: '角色',
                icon: <TeamOutlined />,
                link: Routes.main.routes.role.path,
            },
            {
                key: 'MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY',
                text: '权限',
                icon: <UsergroupAddOutlined />,
                link: Routes.main.routes.authority.path,
            }
            ]
        }, {
            key: 'MENU_ITEM_NOTICE',
            text: '系统设置',
            icon: <SettingOutlined />,
            link: Routes.main.routes.settings.path
        },
    ];
}
