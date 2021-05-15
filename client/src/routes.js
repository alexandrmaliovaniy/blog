import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserPage from './pages/UserPage';
import NewPostPage from './pages/NewArticlePage';
import PostPage from './pages/ArticlePage';
import SubscribePage from './pages/SubscribePage';

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage />
                </Route>
                <Route path="/subscribes" exact>
                    <SubscribePage />
                </Route>
                <Route path="/user/:login">
                    <UserPage />
                </Route>
                <Route path="/post/new">
                    <NewPostPage />
                </Route>
                <Route path="/post/preview/:id">
                    <PostPage />
                </Route>
                <Redirect to="/home" />
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
            <Route path="/post/preview/:id">
                    <PostPage />
                </Route>
            <Route path="/user/:login">
                <UserPage />
            </Route>
            <Redirect to="/home"/>
        </Switch>
    )
}