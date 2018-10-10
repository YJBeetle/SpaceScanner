import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import DuStart from './DuStart';
import Du from './Du';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diskUsages: [],
        };
    }

    handleNewDiskUsages = (obj) => new Promise((resolve, reject) => {
        this.setState({ diskUsages: [...this.state.diskUsages, obj] }, () => { resolve(this.state.diskUsages.length - 1) });
    })

    render() {
        return (
            <Route render={({ location }) => (
                <Navigation diskUsages={this.state.diskUsages}>
                    <Switch key={location.key}>
                        <Route exact path="/" location={location} component={Home} />
                        <Route path="/dustart" location={location} component={() => (<DuStart newDiskUsages={this.handleNewDiskUsages} />)} />
                        <Route path="/du" location={location} component={Du} />
                    </Switch>
                </Navigation>
            )} />
        );
    }
}

export default App;
