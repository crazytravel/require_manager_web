import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSession } from '../contexts/session-context';

const ProtectedRoute: React.FC<RouteProps> = props => {

    const auth = useSession();

    const developMode = process.env.NODE_ENV

    if (!auth.session.username && developMode === 'production') {
        return <Redirect to="/login" />;
    } else {
        return <Route {...props} />;
    }
}

export default ProtectedRoute;