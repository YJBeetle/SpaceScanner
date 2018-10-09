import React, { Component } from 'react';
import { Button, FontIcon, Card, CardTitle, CardText, CardActions } from 'react-md';

export default class Page1 extends Component {
  render() {
    return (
      <div className="">


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
