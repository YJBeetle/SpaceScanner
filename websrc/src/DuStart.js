import React, { Component } from 'react';
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
                        <Button raised primary iconEl={<FontIcon>send</FontIcon>} onClick={() => {
                            quest.du.new(this.filePath)
                                .then((newdu) => {
                                    console.log(newdu);
                                    console.log(this.props);
                                    this.props.router.push('/du/1');
                                })
                        }}>Run</Button>
                    </CardText>
                </Card>
            </div>
        );
    }
}
