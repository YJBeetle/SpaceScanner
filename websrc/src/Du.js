import React, { Component } from 'react';
import { Button, FontIcon, Card, Divider, Chip, Avatar, Collapse } from 'react-md';
import Measure from 'react-measure'

import './Du.css';
import quest from './quest';

const blockGap = 2;         //间隙
const blockBorder = 1;      //边框粗细(需要和css保持一致)
const blockTextHeight = 16; //标题高度(需要和css保持一致)

class Block extends Component {
    render() {
        let usageData = this.props.usageData;
        let top = this.props.dimensions.top;
        let left = this.props.dimensions.left;
        let height = this.props.dimensions.height;
        let width = this.props.dimensions.width;
        let prefix = this.props.prefix;

        let brotherSize = 0;  //用于储存遍历时兄弟累加

        //计算需要的数据
        // let top = ;
        // let height = ;

        return (
            <div
                className={`block ${usageData.type === 3 ? "folder" : "file"}`}
                style={{
                    top: `${top}px`,
                    left: `${left}px`,
                    height: `${height}px`,
                    width: `${width}px`,
                }}
            >
                {
                    usageData.child ? (
                        <div className="child">{
                            usageData.child.map((value, index) => {
                                let newBlock = (
                                    <Block
                                        usageData={value}
                                        dimensions={{
                                            top: brotherSize / usageData.size * (height - blockTextHeight - blockTextHeight * usageData.child.length - blockBorder * 2) + blockTextHeight * index + blockBorder,
                                            left: blockBorder,
                                            height: value.size / usageData.size * (height - blockTextHeight - blockTextHeight * usageData.child.length - blockBorder * 2) + blockTextHeight - blockGap,
                                            width: width - blockGap - blockBorder * 2,
                                        }}
                                        key={`${prefix}/${value.name}`}
                                        prefix={`${prefix}/${value.name}`}
                                    ></Block>
                                );
                                brotherSize += value.size;
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
}

export default class Du extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDir: false,
            usageData: {},
            spaceDimensions: {},
        };

        this.id = this.props.match.params.id; //从Route获得当前选择的id

        if (!this.props.diskUsages[this.id]) {
            this.props.history.push('/dustart') //如果diskUsages中不存在当前的id，则跳转到dustart
            return;
        }

        quest.du.usageData(this.props.match.params.id)
            .then((usageData) => {
                console.log("post:", usageData);
                this.setState({ usageData: usageData });
            });
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
                <Measure bounds onResize={contentRect => this.setState({ spaceDimensions: contentRect.bounds })} >
                    {({ measureRef }) =>
                        <div ref={measureRef} className="space">
                            <Block
                                usageData={this.state.usageData}
                                dimensions={{
                                    top: 0,
                                    left: 0,
                                    height: this.state.spaceDimensions.height,
                                    width: this.state.spaceDimensions.width,
                                }}
                                prefix="root"
                            ></Block>
                        </div>
                    }
                </Measure>
            </div>
        );
    }
}
