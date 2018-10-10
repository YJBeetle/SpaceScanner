import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import DuStart from './DuStart';
import Du from './Du';

class App extends Component {
    render() {
        return (
            <Route render={({ location }) => (
                <Navigation>
                    <Switch key={location.key}>
                        <Route exact path="/" location={location} component={Home} title="Welcome" />
                        <Route path="/dustart" location={location} render={props => (<DuStart newdo={this.newdo} {...props} />)} title="Start" />
                        <Route path="/du/:duId*" location={location} component={Du} title="Disk usage" />
                    </Switch>
                </Navigation>
            )} />
        );
    }
}

export default App;
