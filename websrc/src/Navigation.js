import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { NavigationDrawer, FontIcon, Button, CircularProgress } from 'react-md';

export default class Navigation extends Component {
    render() {
        const {
            location: { pathname },
            children,
        } = this.props;

        return (
            <NavigationDrawer
                drawerTitle={<div onClick={() => { console.log(this.props, this.props.params) }}>Space Scanner</div>}
                toolbarTitle={this.props.params.duId || children.props.route.title || "Space Scanner"}
                navItems={
                    [
                        {
                            key: 'home',
                            primaryText: 'Home',
                            leftIcon: <FontIcon>home</FontIcon>,
                            component: IndexLink,
                            to: '/',
                            active: '/' === pathname,
                        },
                        {
                            divider: true,
                        },
                        {
                            primaryText: 'Disk usage statistics',
                            subheader: true,
                        },
                        {
                            key: 'start',
                            primaryText: 'Start',
                            leftIcon: <FontIcon>send</FontIcon>,
                            component: Link,
                            to: '/dustart',
                            active: '/dustart' === pathname,
                        },
                        {
                            key: '/opt',
                            primaryText: '/opt',
                            leftIcon: <FontIcon>insert_chart</FontIcon>,
                            component: Link,
                            to: '/du/1',
                            active: pathname.indexOf('/du/1') === 0,
                            children: <CircularProgress></CircularProgress>,
                            nestedItems: [
                                {
                                    key: '1',
                                    primaryText: '1',
                                    leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                                    active: pathname.indexOf('/du/1/1') === 0,
                                    onClick: () => {
                                        console.log("click file /du/1/1");
                                    },
                                },
                                {
                                    key: '2',
                                    primaryText: '2',
                                    leftIcon: <FontIcon>folder</FontIcon>,
                                    active: pathname.indexOf('/du/1/2') === 0,
                                    children: <Button icon primary onClick={() => { this.props.router.push('/du/1/2') }}>insert_chart_outlined</Button>,
                                    onClick: () => {
                                        console.log("click dir /du/1/2");
                                    },
                                    nestedItems: [
                                        {
                                            key: '21',
                                            primaryText: '21',
                                            leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                                        },
                                        {
                                            key: '22',
                                            primaryText: '22',
                                            leftIcon: <FontIcon>insert_link</FontIcon>,
                                        },
                                        {
                                            key: '221',
                                            primaryText: '221',
                                            leftIcon: <FontIcon>folder</FontIcon>,
                                            nestedItems: [
                                                {
                                                    key: '2211',
                                                    primaryText: '2211',
                                                    leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                                                },
                                            ]
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            key: '/',
                            primaryText: '/',
                            leftIcon: <FontIcon>insert_chart</FontIcon>,
                            component: Link,
                            to: '/du/2',
                            active: pathname.indexOf('/du/2') === 0,
                        },
                        {
                            key: '/usr',
                            primaryText: '/usr',
                            leftIcon: <FontIcon>insert_chart</FontIcon>,
                            component: Link,
                            to: '/du/3',
                            active: pathname.indexOf('/du/3') === 0,
                        },
                        {
                            divider: true,
                        },
                    ]
                }
                toolbarActions={this.props.params.duId ? <Button icon onClick={() => { console.log("close" + this.props.params.duId) }}>close</Button> : null}
            >
                {children ? React.cloneElement(children, { key: pathname }) : null}
            </NavigationDrawer>
        );
    }
}
