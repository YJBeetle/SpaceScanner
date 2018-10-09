import React, { Component } from 'react';
import { NavigationDrawer, Button, FontIcon, Card, CardTitle, CardText, CardActions } from 'react-md';
import './home.css';

export default class Home extends Component {
  render() {
    return (
        <div className="home">
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
    );
  }
}
