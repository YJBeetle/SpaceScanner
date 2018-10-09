import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { NavigationDrawer, FontIcon } from 'react-md';

import './App.css';

class App extends Component {
  render() {
    const {
      location: { pathname },
      children,
    } = this.props;

    return (
      <NavigationDrawer
        drawerTitle={<div onClick={() => { console.log("click title") }}>Space Scanner</div>}
        toolbarTitle="Welcome"
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
              nestedItems: [
                {
                  key: '1',
                  primaryText: '1',
                  leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                  onClick: () => {
                    console.log("click");
                    var newUrl = "/du/1/1";
                    window.history.pushState(null, null, newUrl);
                  },
                  active: pathname.indexOf('/du/1/1') === 0,
                },
                {
                  key: '2',
                  primaryText: '2',
                  leftIcon: <FontIcon>folder</FontIcon>,
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
      // toolbarActions={<Button icon onClick={}>close</Button>}
      >
        {children ? React.cloneElement(children, { key: pathname }) : null}
      </NavigationDrawer>
    );
  }
}

export default App;
