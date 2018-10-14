import React, { Component } from 'react';
import { Button, FontIcon, Card, Divider, Chip, Avatar, Collapse } from 'react-md';

import './Du.css';
import quest from './quest';

const blockGap = 1;
const blockTextHeight = 16;



export default class Du extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDir: false,
            usageData: {},
        };

        this.id = this.props.match.params.id; //从Route获得当前选择的id

        if (!this.props.diskUsages[this.id]) {
            this.props.history.push('/dustart') //如果diskUsages中不存在当前的id，则跳转到dustart
            return;
        }

        quest.du.usageData(this.props.match.params.id)
            .then((usageData) => {
                console.log(usageData);
                this.setState({ usageData: usageData });
            });
    }

    makeBlock = (usageData, offset, parentSize, parentCount, prefix) => {
        let offsetMap = 0;  //储存遍历时每个的偏移量
        return (
            <div
                className={`block ${usageData.type === 3 ? "folder" : "file"}`}
                key={`${prefix}-${usageData.name}`}
                style={{
                    top: `calc(${offset * 100 / parentSize}% + ${blockGap}px)`,
                    height: `calc(${usageData.size * 100 / parentSize}% - ${blockGap}px)`,
                    left: `calc(0% + ${blockGap}px)`,
                    right: `calc(0% + ${blockGap}px)`,
                }}
            >
                {
                    usageData.child ? (
                        <div className="child">{
                            usageData.child.map((value) => {
                                let newBlock = this.makeBlock(value, offsetMap, usageData.size, usageData.child.length, `${prefix}-${usageData.name}`);
                                offsetMap += value.size;
                                return newBlock;
                            })
                        }
                        </div>
                    ) : (
                            null
                        )
                }
                <div className="text">
                    {`${usageData.name} - ${usageData.size} Byte`}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="du">
                <Card className="tools">
                    <div className="buttons">
                        <Button icon secondary iconChildren={this.state.showDir ? "folder_open" : "folder"} tooltipLabel="Path" tooltipPosition="right" onClick={() => this.setState({ showDir: !this.state.showDir })}>Path</Button>
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
                <Card className="space">
                    {this.makeBlock(this.state.usageData, 0, this.state.usageData.size, 1, "")}
                </Card>
            </div>
        );
    }
}
