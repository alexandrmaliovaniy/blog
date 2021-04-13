import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserPage from './pages/UserPage';
import NewPostPage from './pages/NewPostPage';

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/user/:login/">
                    <UserPage />
                </Route>
                <Route path="/post/:login">
                    <NewPostPage />
                </Route>
                {/* <Redirect to="/home" /> */}
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/home" exact>
                <HomePage />
            </Route>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            {/* <Route path="/user/:login">
                <UserPage />
            </Route> */}
            {/* <Redirect to="/home"/> */}
        </Switch>
    )
}