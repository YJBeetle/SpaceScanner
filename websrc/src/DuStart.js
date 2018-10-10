import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button, FontIcon, Card, CardTitle, CardText, TextField } from 'react-md';
import quest from './quest';

export default class Page1 extends Component {
    render() {
        return (
            <div className="dustart">
                <Card className="">
                    <CardTitle title="Disk usage statistics" />
                    <CardText>
                        <TextField id="path" label="Path" lineDirection="center" placeholder="/" onChange={(v) => { this.filePath = v }} />
                        <Route component={(match) => (
                            <Button raised primary iconEl={<FontIcon>send</FontIcon>} onClick={() => {
                                quest.du.new(this.filePath)
                                    .then((newdu) => this.props.newDiskUsages(newdu))
                                    .then((id) => match.history.push('/du/' + id))
                            }}>Run</Button>
                        )} />;
                    </CardText>
                </Card>
            </div>
        );
    }
}
