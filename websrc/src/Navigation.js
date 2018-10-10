import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { NavigationDrawer, ListItem, FontIcon, Button, CircularProgress } from 'react-md';
import quest from './quest';

export default class Navigation extends Component {
    render() {
        return (
            <NavigationDrawer
                drawerTitle={<div onClick={() => { console.log(this.props) }}>Space Scanner</div>}
                toolbarTitle={
                    <div>
                        <Switch>
                            <Route exact path="/" component={() => (<div>Welcome</div>)} />
                            <Route path="/dustart" component={() => (<div>Start</div>)} />
                            <Route path="/du/:id" render={({ match }) => (<div>{this.props.diskUsages[parseInt(match.params.id)] ? this.props.diskUsages[parseInt(match.params.id)].filePath : 'Disk usage'}</div>)} />
                            <Route path="" component={() => (<div>Space Scanner</div>)} />
                        </Switch>
                    </div>
                }
                navItems={
                    [
                        <Route key='home' exact path={"/"}>{({ match }) => (
                            <ListItem
                                primaryText={'Home'}
                                leftIcon={<FontIcon>home</FontIcon>}
                                active={!!match}
                                component={Link}
                                to={'/'}
                            />
                        )}</Route>,
                        {
                            divider: true,
                        },
                        {
                            primaryText: 'Disk usage statistics',
                            subheader: true,
                        },
                        <Route key='start' path={"/dustart"}>{({ match }) => (
                            <ListItem
                                primaryText={'Start'}
                                leftIcon={<FontIcon>send</FontIcon>}
                                active={!!match}
                                component={Link}
                                to={'/dustart'}
                            />
                        )}</Route>,
                        ...this.props.diskUsages.map((value, index) => (
                            value ? <Route key={'du-' + index} path={'/du/' + index}>{({ match }) => (
                                <ListItem
                                    primaryText={value.filePath}
                                    leftIcon={<FontIcon>insert_chart</FontIcon>}
                                    active={!!match}
                                    component={Link}
                                    to={'/du/' + index}
                                />
                            )}</Route> : <div key={'du-' + index}></div>
                        )),
                        // {
                        //     key: '/opt',
                        //     primaryText: '/opt',
                        //     leftIcon: <FontIcon>insert_chart</FontIcon>,
                        //     component: Link,
                        //     to: '/du/1',

                        //     children: <CircularProgress></CircularProgress>,
                        //     nestedItems: [
                        //         {
                        //             key: '1',
                        //             primaryText: '1',
                        //             leftIcon: <FontIcon>insert_drive_file</FontIcon>,

                        //             onClick: () => {
                        //                 console.log("click file /du/1/1");
                        //             },
                        //         },
                        //         {
                        //             key: '2',
                        //             primaryText: '2',
                        //             leftIcon: <FontIcon>folder</FontIcon>,

                        //             children: <Button icon primary onClick={() => { this.props.router.push('/du/1/2') }}>insert_chart_outlined</Button>,
                        //             onClick: () => {
                        //                 console.log("click dir /du/1/2");
                        //             },
                        //             nestedItems: [
                        //                 {
                        //                     key: '21',
                        //                     primaryText: '21',
                        //                     leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                        //                 },
                        //                 {
                        //                     key: '22',
                        //                     primaryText: '22',
                        //                     leftIcon: <FontIcon>insert_link</FontIcon>,
                        //                 },
                        //                 {
                        //                     key: '221',
                        //                     primaryText: '221',
                        //                     leftIcon: <FontIcon>folder</FontIcon>,
                        //                     nestedItems: [
                        //                         {
                        //                             key: '2211',
                        //                             primaryText: '2211',
                        //                             leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                        //                         },
                        //                     ]
                        //                 },
                        //             ]
                        //         },
                        //     ]
                        // },
                        // {
                        //     key: '/',
                        //     primaryText: '/',
                        //     leftIcon: <FontIcon>insert_chart</FontIcon>,
                        //     component: Link,
                        //     to: '/du/2',

                        // },
                        // {
                        //     key: '/usr',
                        //     primaryText: '/usr',
                        //     leftIcon: <FontIcon>insert_chart</FontIcon>,
                        //     component: Link,
                        //     to: '/du/3',

                        // },
                        {
                            divider: true,
                        },
                    ]
                }
                toolbarActions={
                    <div>
                        <Route path="/du/:id" component={({ match, history }) => (
                            <Button icon onClick={() => {
                                let id = parseInt(match.params.id);
                                quest.du.free(id).then((nextid) => {
                                    if (nextid !== -1)
                                        history.push('/du/' + nextid);
                                    else
                                        history.push('/dustart');
                                    this.props.deleteDiskUsages(id);
                                })
                            }
                            }>close</Button>
                        )} />
                    </div>
                }
            >
                {this.props.children}
            </NavigationDrawer>
        );
    }
}
