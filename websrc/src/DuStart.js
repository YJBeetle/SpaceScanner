import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button, FontIcon, Card, CardTitle, CardText, TextField } from 'react-md';
import quest from './quest';

export default class DuStart extends Component {
    render() {
        return (
            <div className="dustart">
                <Card className="">
                    <CardTitle title="Disk usage statistics" />
                    <CardText>
                        <TextField id="path" label="Path" lineDirection="center" placeholder="/" onChange={(v) => { this.filePath = v }} />
                        <Route component={({ history }) => (
                            <Button raised primary iconEl={<FontIcon>send</FontIcon>} onClick={() => {
                                quest.du.new(this.filePath)
                                    .then((newdu) => this.props.newDiskUsages(newdu))
                                    .then((id) => history.push('/du/' + id));
                            }}>Run</Button>
                        )} />
                    </CardText>
                </Card>
            </div>
        );
    }
}
