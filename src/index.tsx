import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {Provider} from "react-redux";
import store from './store/index';
import {createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider} from "react-router-dom";
import SprintExamplePage from "./pages/sprint-example.page";
import ProfilePage from "./pages/profile.page";
import {RoutesConfig} from "./routesConfig";
import PagesPage from "./pages/pages.page";
import CustomPage from "./pages/custom.page";

const redirectFn = (to: string) => () => redirect(to);

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" Component={App}>
            <Route path={RoutesConfig.dashboard} Component={PagesPage} />
            <Route path={RoutesConfig.sprintExamplePage} Component={SprintExamplePage} />
            <Route path={RoutesConfig.page} Component={CustomPage} />
            <Route path="profile" Component={ProfilePage}>
                <Route path="*" loader={redirectFn("") }></Route>
            </Route>
            <Route path="settings" Component={ProfilePage} />
            <Route path="config" Component={ProfilePage}>
            </Route>
            <Route path="/" loader={redirectFn(RoutesConfig.dashboard) } />
            <Route path="*" loader={redirectFn(RoutesConfig.dashboard) } />
        </Route>
    )
);

// mb in home we can have in loader to check if this page exists

// home - list of pages
// home/:pageId

// config - kinda like dictionary
// config/:entityId - config specific entity??x

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
