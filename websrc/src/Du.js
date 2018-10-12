import React, { Component } from 'react';
import { Button, FontIcon, Card, CardTitle, CardText, TextField, Divider, Chip, Avatar, Paper, Collapse } from 'react-md';

import './Du.css';

export default class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDir: false,
        };
    }

    render() {
        return (
            <div className="du">
                <Card className="tools">
                    <div className="buttons">
                        <Button icon secondary iconChildren={this.state.showDir?"folder_open":"folder"} tooltipLabel="Path" tooltipPosition="right" onClick={() => this.setState({ showDir: !this.state.showDir })}>Path</Button>
                        <Button icon secondary iconChildren="find_replace" tooltipLabel="Refresh" tooltipPosition="right">Refresh</Button>
                        <Button icon secondary iconChildren="view_stream" tooltipLabel="Less detail" tooltipPosition="right">Less detail</Button>
                        <Button icon secondary iconChildren="view_quilt" tooltipLabel="More detail" tooltipPosition="right">More detail</Button>
                        <Button icon secondary iconChildren="info" tooltipLabel="Info" tooltipPosition="right">Info</Button>
                    </div>
                    <Divider />
                    <Collapse collapsed={!this.state.showDir}>
                        <div className="dir">
                            <Chip className="folder" label="/opt/" avatar={<Avatar><FontIcon>home</FontIcon></Avatar>} /><FontIcon>navigate_next</FontIcon>
                            <Chip className="folder" label="A_Folder" avatar={<Avatar random>A</Avatar>} /><FontIcon>navigate_next</FontIcon>
                            <Chip className="folder" label="B_Folder" avatar={<Avatar random>B</Avatar>} /><FontIcon>navigate_next</FontIcon>
                            <Chip className="folder" label="C_Folder" avatar={<Avatar random>C</Avatar>} />
                        </div>
                    </Collapse>
                </Card>
                <Paper className="space">
                    <Paper className="block one">One</Paper>
                    <Paper className="block two">Two</Paper>
                    <Paper className="block selected three">Three</Paper>
                    <Paper className="block four">Four</Paper>
                    <Paper className="block five">Five</Paper>
                    <Paper className="block six">Six</Paper>
                </Paper>
            </div>
        );
    }
}
