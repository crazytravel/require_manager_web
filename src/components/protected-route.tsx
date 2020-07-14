import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSession } from 'contexts/session-context';

const ProtectedRoute: React.FC<RouteProps> = props => {

    const { session } = useSession();

    if (!session.username) {
        return <Redirect to="/sign-in" />;
    } else {
        return <Route {...props} />;
    }
}

export default ProtectedRoute;