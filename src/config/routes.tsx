import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
    WelcomePage,
    UserPage,
    VersionPage,
    GatewayPage,
    SubsystemPage,
    RolePage,
    AuthorityPage,
    ErrorPage,
} from 'layouts/main/export';
import ProtectedRoute from 'components/protected-route';
import MainLayout from 'layouts/main/main';
import KanbanLayout from 'layouts/kanban/kanban';
import SignInLayout from 'layouts/sign/sign-in';
import SignUpLayout from 'layouts/sign/sign-up';

import { useSession } from 'contexts/session-context';

export const SystemRoutes: React.FC = () => {
    return (
        <Switch>
            <ProtectedRoute path="/" exact><Redirect to="/kanban" /></ProtectedRoute>
            <ProtectedRoute path="/main" component={MainLayout} />
            <ProtectedRoute path="/kanban" exact component={KanbanLayout} />
            <Route path="/sign-in" component={SignInLayout} />
            <Route path="/sign-up" component={SignUpLayout} />
            <Route><ErrorPage code={404} message="Page not found" /></Route>
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
                authorities?.includes('MENU_ITEM_SYSTEM_SUBSYSTEM') ?
                    <SubsystemPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/system/user" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_USER') ?
                    <UserPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/system/role" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_ROLE') ?
                    <RolePage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/system/authority" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY') ? 
                <AuthorityPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/version" render={() =>
                authorities?.includes('MENU_ITEM_VERSION') ?
                    <VersionPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/gateway" render={() =>
                authorities?.includes('MENU_ITEM_GATEWAY') ?
                    <GatewayPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route><ErrorPage code={404} message="Page not found" /></Route>
        </Switch>
    )
}