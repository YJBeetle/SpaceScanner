import React, { Component } from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import DuStart from './DuStart';
import Du from './Du';

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Navigation}>
                    <IndexRoute component={Home} title="Welcome" />
                    <Route path="/dustart" component={DuStart} title="Start" />
                    <Route path="/du/:duId*" component={Du} title="Disk usage" />
                </Route>
            </Router>
        );
    }
}

export default App;
