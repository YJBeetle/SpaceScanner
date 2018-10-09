import React, { Component } from 'react';
import { NavigationDrawer, Button, FontIcon, Card, CardTitle, CardText, CardActions } from 'react-md';
import './App.css';

class App extends Component {
  render() {
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
              onClick: () => { console.log("click start") },
              active: true,
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
              onClick: () => { console.log("click start") },
              active: true,
            },
            {
              key: '/opt',
              primaryText: '/opt',
              leftIcon: <FontIcon>insert_chart</FontIcon>,
              nestedItems:[
                {
                  key: '1',
                  primaryText: '1',
                  leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                },
                {
                  key: '1',
                  primaryText: '1',
                  leftIcon: <FontIcon>folder</FontIcon>,
                  nestedItems:[
                    {
                      key: '1',
                      primaryText: '1',
                      leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                    },
                    {
                      key: '1',
                      primaryText: '1',
                      leftIcon: <FontIcon>insert_link</FontIcon>,
                    },
                    {
                      key: '1',
                      primaryText: '1',
                      leftIcon: <FontIcon>folder</FontIcon>,
                      nestedItems:[
                        {
                          key: '1',
                          primaryText: '1',
                          leftIcon: <FontIcon>insert_drive_file</FontIcon>,
                        },
                      ]
                    },
                  ]
                },
              ]
            },
            {
              key: '2',
              primaryText: '/',
              leftIcon: <FontIcon>insert_chart</FontIcon>,
            },
            {
              key: '3',
              primaryText: '/usr',
              leftIcon: <FontIcon>insert_chart</FontIcon>,
            },
            {
              divider: true,
            },
          ]
        }
      // toolbarActions={<Button icon onClick={}>close</Button>}
      >
        <div className="App">
          <Button raised primary iconEl={<FontIcon>home</FontIcon>}>Button</Button>

          <div className="md-grid">
            <Card className="md-cell">
              <CardTitle title="Hello, World!" />
              <CardText>
                Lorem ipsum... pretend more ...
          </CardText>
              <CardActions>
                <Button flat label="Action 1" />
                <Button flat label="Action 2" />
              </CardActions>
            </Card>
          </div>

        </div>
      </NavigationDrawer>
    );
  }
}

export default App;
