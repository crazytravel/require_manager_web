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

export const generateMenu = function (): MenuItem[] {
    return [
        {
            key: 'welcome',
            text: '欢迎',
            icon: <SmileOutlined />,
            link: Routes.main.routes.welcome.path,
        },
        {
            key: 'project',
            text: '项目管理',
            icon: <UploadOutlined />,
            link: Routes.main.routes.project.path,
        },
        {
            key: 'user',
            text: '个人信息',
            icon: <UserOutlined />,
            link: Routes.main.routes.user.path,
        },
        {
            key: 'settings',
            text: '系统设置',
            icon: <SettingOutlined />,
            link: Routes.main.routes.settings.path,
        },
    ];
};
