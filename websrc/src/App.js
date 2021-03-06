import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navigation from './Navigation';
import Home from './Home';
import DuStart from './DuStart';
import Du from './Du';
import quest from './quest';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diskUsages: [],
        };
        quest.du.getInfo()
            .then((du) => this.setState({ diskUsages: du }));
    }

    handleNewDiskUsages = (newdu) => new Promise((resolve, reject) => {
        this.setState({ diskUsages: [...this.state.diskUsages, newdu] }, () => { resolve(this.state.diskUsages.length - 1) });
    })

    handleDeleteDiskUsages = (delId) => {
        this.setState({ diskUsages: this.state.diskUsages.map((value, index) => (index === delId) ? null : value) });
    }

    render() {
        return (
            <Route render={({ location }) => (
                <Navigation diskUsages={this.state.diskUsages} deleteDiskUsages={this.handleDeleteDiskUsages}>
                    <Switch key={location.pathname}>
                        <Route exact path="/" component={Home} />
                        <Route path="/dustart" component={() => (<DuStart newDiskUsages={this.handleNewDiskUsages} />)} />
                        {/* <Route path="/du/:id" component={({ match, history }) => <Du match={match} history={history} diskUsages={this.state.diskUsages} />} /> */}
                        <Route path="/du/:id" component={({ match, history }) => (location.pathname === match.url) ? <Du match={match} history={history} diskUsages={this.state.diskUsages} /> : null} />
                    </Switch>
                </Navigation>
            )} />
        );
    }
}

export default App;
