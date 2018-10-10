import React, { Component } from 'react';
import { Button, FontIcon, Card, CardTitle, CardText, TextField, Divider, Chip, Avatar } from 'react-md';

import './Du.css';

export default class Page2 extends Component {
    render() {
        return (
            <div className="du">
                <Card className="tools">
                    <div>
                        <Button className="button" icon secondary iconChildren="find_replace" tooltipLabel="Refresh" tooltipPosition="right">Refresh</Button>
                        <Button className="button" icon secondary iconChildren="view_stream" tooltipLabel="Less detail" tooltipPosition="right">Less detail</Button>
                        <Button className="button" icon secondary iconChildren="view_quilt" tooltipLabel="More detail" tooltipPosition="right">More detail</Button>
                        <Button className="button" icon secondary iconChildren="info" tooltipLabel="Info" tooltipPosition="right">Info</Button>
                    </div>
                    <Divider />
                    <div className="dir">
                        <Chip className="folder" label="Root directory" avatar={<Avatar><FontIcon>home</FontIcon></Avatar>} /><FontIcon>navigate_next</FontIcon>
                        <Chip className="folder" label="A_Folder" avatar={<Avatar random>A</Avatar>} /><FontIcon>navigate_next</FontIcon>
                        <Chip className="folder" label="B_Folder" avatar={<Avatar random>B</Avatar>} /><FontIcon>navigate_next</FontIcon>
                        <Chip className="folder" label="C_Folder" avatar={<Avatar random>C</Avatar>} />
                    </div>
                </Card>
                <div className="space-block">
                    test text
                </div>
                <div className="space-block">
                    test text
                </div>
                test text
            </div>
        );
    }
}
