import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
    WelcomePage,
    KanbanPage,
    UserPage,
    VersionPage,
    GatewayPage,
    ProjectPage,
    RolePage,
    AuthorityPage,
    ErrorPage,
} from 'layouts/main/export';
import ProtectedRoute from 'components/protected-route';
import MainLayout from 'layouts/main/main';
import SignInLayout from 'layouts/sign/sign-in';
import SignUpLayout from 'layouts/sign/sign-up';

import { useSession } from 'contexts/session-context';

export const SystemRoutes: React.FC = () => {
    return (
        <Switch>
            <ProtectedRoute path="/" exact><Redirect to="/main" /></ProtectedRoute>
            <ProtectedRoute path="/main" component={MainLayout} />
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
            <Route path="/main" exact><Redirect to="/main/kanban" /></Route>
            <Route path="/main/welcome" component={WelcomePage} />
            <Route path="/main/kanban" component={KanbanPage} />
            <Route path="/main/project" render={() =>
                    <ProjectPage />
            } />
            <Route path="/main/user" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_USER') ?
                    <UserPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/role" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_ROLE') ?
                    <RolePage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route path="/main/authority" render={() =>
                authorities?.includes('MENU_ITEM_SYSTEM_ACCOUNT_AUTHORITY') ? 
                <AuthorityPage /> : <ErrorPage code={401} message="Forbidden access this page" />
            } />
            <Route><ErrorPage code={404} message="Page not found" /></Route>
        </Switch>
    )
}