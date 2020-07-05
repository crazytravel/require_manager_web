import React, { useState, useEffect } from 'react'
import { Select, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FundOutlined, AppstoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ClickParam } from 'antd/lib/menu';
import { Project } from 'models/kanban';
import { useFetch } from 'hooks/fetch';

const { Option } = Select;

interface ToolbarProps {
    activeProjectId?: string,
    onFinish?: (projectId: string) => void,
}

const Toolbar: React.FC<ToolbarProps> = ({
    activeProjectId,
    onFinish
}) => {
    const { pathname } = useLocation();
    let currentPath = pathname.substring(pathname.indexOf('/') + 1);
    if (currentPath !== 'kanban') {
        currentPath = 'main';
    }
    
    const [currentPage, setCurrentPage] = useState<string>(currentPath);
    const [searchValue, setSearchValue] = useState<string>(activeProjectId || '');

    useEffect(() => {
        let currentPath = pathname.substring(pathname.indexOf('/') + 1);
        if (currentPath !== 'kanban') {
            currentPath = 'main';
        }
        setCurrentPage(currentPath);
        setSearchValue(activeProjectId || '');
    }, [pathname, activeProjectId]);

    const { fetchedData } = useFetch<Project[]>(`/api/v1/projects`, []);

    const handleMenuClick = (e: ClickParam) => {
        setCurrentPage(e.key);
    }

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleChange = (value: string) => {
        setSearchValue(value);
        console.log('刷新', value);
        if (onFinish) {
            onFinish(value);
        }
    }

    const options = fetchedData?.map(project => <Option value={project.id} key={project.id}>{project.name}</Option>);

    return (
        <Subtitle>
            <Menu onClick={handleMenuClick} selectedKeys={[currentPage]} mode="horizontal">
                <Menu.Item key="kanban" icon={<FundOutlined />}>
                    <Link to="/kanban">看板</Link>
                </Menu.Item>
                <Menu.Item key="main" icon={<AppstoreOutlined />}>
                    <Link to="/main">系统管理</Link>
                </Menu.Item>
            </Menu>
            {/* <Divider type="vertical" /> */}
            <MenuContainer>
                {currentPage === 'kanban' ?
                    <Condition>
                        搜索项目：
                        <Select
                            showSearch
                            value={searchValue}
                            style={{ width: 200 }}
                            placeholder="选择项目"
                            optionFilterProp="children"
                            onChange={handleChange}
                            onSearch={handleSearch}
                            filterOption={false}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>
                    </Condition>
                    : ''}
            </MenuContainer>
        </Subtitle>
    )
}

const Subtitle = styled.div`
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    z-index: 10;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 10px;
`;

const Condition = styled.div`
    
`;


export default Toolbar;
