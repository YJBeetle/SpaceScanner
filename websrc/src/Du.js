import React, { Component } from 'react';
import { Button, FontIcon, Card, Divider, Chip, Avatar, Collapse } from 'react-md';
import Measure from 'react-measure'

import './Du.css';
import quest from './quest';

const blockGap = 2;         //间隙
const blockBorder = 1;      //边框粗细
const blockTextHeight = 16; //标题高度

class Block extends Component {
    render() {
        let dimensionsH = this.props.dimensions.height;
        let dimensionsW = this.props.dimensions.width;
        let usageData = this.props.usageData;
        let brotherSize = this.props.brotherSize;
        let brotherCount = this.props.brotherCount;
        let parentSize = this.props.parentSize;
        let parentCount = this.props.parentCount;
        let prefix = this.props.prefix;

        let brotherSizeMap = 0;  //储存遍历时兄弟累加
        let brotherCountMap = 0;

        //计算需要的数据
        let top = brotherSize / parentSize * (dimensionsH - blockTextHeight * parentCount - blockBorder * 2) + blockTextHeight * brotherCount;
        let height = usageData.size / parentSize * (dimensionsH - blockTextHeight * parentCount - blockBorder * 2) + blockTextHeight - blockGap;

        return (
            <div
                className={`block ${usageData.type === 3 ? "folder" : "file"}`}
                style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${blockGap}px`,
                    right: `${blockGap}px`,
                }}
            >
                {
                    usageData.child ? (
                        <div className="child">{
                            usageData.child.map((value) => {
                                let newBlock = (
                                    <Block
                                        usageData={value}
                                        brotherSize={brotherSizeMap}
                                        brotherCount={brotherCountMap}
                                        parentSize={usageData.size}
                                        parentCount={usageData.child.length}
                                        key={`${prefix}/${value.name}`}
                                        prefix={`${prefix}/${value.name}`}
                                        dimensions={{ height: height - blockTextHeight }}
                                    ></Block>
                                );
                                brotherSizeMap += value.size;
                                brotherCountMap++;
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
                                brotherSize={0}
                                brotherCount={0}
                                parentSize={this.state.usageData.size}
                                parentCount={1}
                                prefix="root"
                                dimensions={{ height: this.state.spaceDimensions.height + blockBorder * 2 }}
                            ></Block>
                        </div>
                    }
                </Measure>
            </div>
        );
    }
}
