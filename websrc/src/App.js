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
              primaryText: 'Space scan',
              subheader: true,
            },
            {
              key: 'start',
              primaryText: 'Start new scan',
              leftIcon: <FontIcon>send</FontIcon>,
              onClick: () => { console.log("click start") },
              active: true,
            },
            {
              key: '1',
              primaryText: '/opt',
              leftIcon: <FontIcon>insert_chart</FontIcon>,
              onClick: () => { console.log("click 1") },
            },
            {
              key: '2',
              primaryText: '/',
              leftIcon: <FontIcon>insert_chart</FontIcon>,
              onClick: () => { console.log("click 2") },
            },
            {
              key: '3',
              primaryText: '/usr',
              leftIcon: <FontIcon>insert_chart</FontIcon>,
              onClick: () => { console.log("click 3") },
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
