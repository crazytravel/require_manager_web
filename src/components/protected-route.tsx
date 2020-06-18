import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSession } from 'contexts/session-context';

const ProtectedRoute: React.FC<RouteProps> = props => {

    const { session } = useSession();

    const developMode = process.env.NODE_ENV

    if (!session.username && developMode === 'production') {
        return <Redirect to="/login" />;
    } else {
        return <Route {...props} />;
    }
}

export default ProtectedRoute;