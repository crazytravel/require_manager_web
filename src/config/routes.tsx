import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from '../pages/welcome/welcome';
import UserPage from '../pages/user/user';
import VersionPage from '../pages/version/version';
import LegalPage from '../pages/legal/legal';
import GatewayPage from '../pages/gateway/gateway';
import TogglePage from '../pages/toggle/toggle';
import NoticePage from '../pages/notice/notice';
import SubsystemPage from '../pages/subsystem/subsystem';
import RolePage from '../pages/role/role';
// import AuthorityPage from '../pages/authority/authority';
import NoMatchPage from '../pages/404/no-match';
import ForbiddenPage from '../pages/403/forbidden';
import ProtectedRoute from '../components/protected-route';
import MainLayout from '../layouts/main/main';
import AdminLayout from '../layouts/kanban/kanban';
import LoginLayout from '../layouts/login/login';
import Support from '../layouts/kanban/support';

import { useSession } from '../contexts/session-context';

export const SystemRoutes: React.FC = () => {
    return (
        <Switch>
            <ProtectedRoute path="/" exact component={MainLayout}><Redirect to="/main" /></ProtectedRoute>
            <ProtectedRoute path="/main" component={MainLayout} />
            <ProtectedRoute path="/admin" exact component={AdminLayout} />
            <ProtectedRoute path="/admin/support" component={Support} />
            <Route path="/login" component={LoginLayout} />
            <Route component={NoMatchPage} />
        </Switch>
    )
}

export const MainRoutes: React.FC = () => {

    const { session } = useSession();
    const authorities = session.authorities;
    return (
        <Switch>
            <Route path="/main" exact><Redirect to="/main/welcome" /></Route>
            <Route path="/main/welcome" component={WelcomePage} />
            <Route path="/main/system/subsystem" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_SUBSYSTEM') ? <SubsystemPage /> : <ForbiddenPage />
            } />
            <Route path="/main/system/user" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_USER') ? <UserPage /> : <ForbiddenPage />
            } />
            <Route path="/main/system/role" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_ROLE') ? <RolePage /> : <ForbiddenPage />
            } />
            {/* <Route path="/main/system/authority" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY') ? <AuthorityPage /> : <ForbiddenPage />
            } /> */}
            <Route path="/main/version" render={() =>
                authorities?.includes('MENU_ITEM_VERSION') ? <VersionPage /> : <ForbiddenPage />
            } />
            <Route path="/main/legal" render={() =>
                authorities?.includes('MENU_ITEM_LEGAL') ? <LegalPage /> : <ForbiddenPage />
            } />
            <Route path="/main/gateway" render={() =>
                authorities?.includes('MENU_ITEM_GATEWAY') ? <GatewayPage /> : <ForbiddenPage />
            } />
            <Route path="/main/toggle" render={() =>
                authorities?.includes('MENU_ITEM_TOGGLE') ? <TogglePage /> : <ForbiddenPage />
            } />
            <Route path="/main/notice" render={() =>
                authorities?.includes('MENU_ITEM_NOTICE') ? <NoticePage /> : <ForbiddenPage />
            } />
            <Route component={NoMatchPage} />
        </Switch>
    )
}