import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, FontIcon, Card, CardTitle, CardText, CardActions } from 'react-md';
import './home.css';

export default class Home extends Component {
    render() {
        return (
            <div className="home md-grid">
                <h2 className="md-cell md-cell--12 welcome">
                    Welcome to Space Scanner
                </h2>
                <Card className="md-cell md-cell--6">
                    <CardTitle title="Disk usage" />
                    <CardText>
                        <p>scan your disk</p>
                    </CardText>
                    <CardActions>
                        <Button flat primary iconEl={<FontIcon>send</FontIcon>} component={Link} to='/dustart'>Start</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
