import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
    WelcomePage,
    UserPage,
    ProjectPage,
    RolePage,
    AuthorityPage,
    ErrorPage,
    StagePage,
    KanbanPage,
    SignInPage,
    SignUpPage,
    SettingsPage,
    UserForm,
} from 'pages/export';
import ProtectedRoute from './protected-route';
import MainLayout from 'layouts/main';
// import { useSession } from './session-context';

interface RouteObj {
    path: string;
    component: React.FC;
    routes?: Record<string, RouteObj>;
}

export const Routes = {
    signIn: {
        path: '/sign-in',
        component: SignInPage,
    },
    signUp: {
        path: '/sign-up',
        component: SignUpPage,
    },
    kanban: {
        path: '/kanban',
        component: KanbanPage,
    },
    main: {
        path: '/main',
        component: MainLayout,
        routes: {
            welcome: {
                path: '/main/welcome',
                component: WelcomePage,
            },
            project: {
                path: '/main/project',
                component: ProjectPage,
            },
            stage: {
                path: '/main/stage',
                component: StagePage,
            },
            user: {
                path: '/main/user',
                component: UserForm,
            },
            role: {
                path: '/main/role',
                component: RolePage,
            },
            authority: {
                path: '/main/authority',
                component: AuthorityPage,
            },
            settings: {
                path: '/main/settings',
                component: SettingsPage,
            },
        },
    },
};

export const RootRoutes: React.FC = () => {
    return (
        <Switch>
            <ProtectedRoute path="/" exact>
                <Redirect to={Routes.kanban.path} />
            </ProtectedRoute>
            <ProtectedRoute
                path={Routes.kanban.path}
                component={Routes.kanban.component}
            />
            <ProtectedRoute
                path={Routes.main.path}
                component={Routes.main.component}
            />
            <Route
                path={Routes.signIn.path}
                component={Routes.signIn.component}
            />
            <Route
                path={Routes.signUp.path}
                component={Routes.signUp.component}
            />
            <Route>
                <ErrorPage code={404} message="页面不存在" />
            </Route>
        </Switch>
    );
};

export const MainRoutes: React.FC = () => {
    // const { session } = useSession();
    // const authorities = session.authorities;
    const mapRoutes = () => {
        const routes = [];
        const routeRecord = Routes.main.routes as Record<string, RouteObj>;
        for (const item in routeRecord) {
            const route = routeRecord[item];
            routes.push(
                <Route
                    key={item}
                    path={route.path}
                    component={route.component}
                />,
            );
        }
        return routes;
    };
    return (
        <Switch>
            <Route path={Routes.main.path} exact>
                <Redirect to={Routes.main.routes.welcome.path} />
            </Route>
            {mapRoutes()}
            <Route>
                <ErrorPage code={404} message="Page not found" />
            </Route>
        </Switch>
    );
};
