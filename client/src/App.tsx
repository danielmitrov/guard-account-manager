import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import faviconImage from './assets/images/favicon.png';
import LoginPage from './pages/LoginPage/LoginPage';


export default function App() {
    return <>
        <Helmet>
            <link rel="icon" type="image/png" href={faviconImage}/>
        </Helmet>
        <Router>
            <Switch>
                <Route path="/">
                    <LoginPage/>
                </Route>
            </Switch>
        </Router>
    </>;
}
