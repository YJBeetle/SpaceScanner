import React, { Component } from 'react';
import { Button, FontIcon, Card, Divider, Chip, Avatar, Collapse } from 'react-md';
import Measure from 'react-measure'

import './Du.css';
import quest from './quest';

const blockGap = 5;         //间隙
const blockBorder = 1;      //边框粗细(需要和css保持一致)
const blockTextHeight = 16; //标题高度(需要和css保持一致)

class Block extends Component {
    render() {
        let usageData = this.props.usageData;
        let child = usageData.child;
        let top = this.props.dimensions.top;
        let left = this.props.dimensions.left;
        let height = this.props.dimensions.height;
        let width = this.props.dimensions.width;
        let prefix = this.props.prefix;

        let rows = null;
        if (child) {
            //对child从小到大排序
            child.sort((a, b) => a.size - b.size);

            //计算分割
            rows = [];
            let i = 0;
            while (i < child.length) {
                let row = { percent: 0, columns: [] };
                rows.push(row);
                while (row.percent < 0.1 && row.columns.length / child.length < 0.1 && i < child.length) {
                    let percent = child[i].size / usageData.size;
                    let column = { percent: percent, block: child[i] }
                    row.columns.push(column);
                    row.percent += percent;
                    i++;
                }
            }
        }

        let rowBrotherPercent = 0;
        let columnBrotherPercent = 0;
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
                    child ? (
                        <div className="child">{
                            rows.map((row, rowIndex) => {
                                let childsHeight = height - blockTextHeight - blockBorder * 2 - blockGap - blockBorder - blockTextHeight * rows.length;     //Block高度 - 自己的标题高度 - 上下边框 - 一个缝隙（上面无缝隙） - 一条边框粗细（因为内容重叠） - 所有标题高度累加
                                let childsWidth = width - blockBorder * 2 - blockGap * 2 - blockBorder;     //Block高度 - 左右边框 - 左右缝隙 - 一条边框粗细（因为内容重叠）
                                let columns = row.columns;
                                columnBrotherPercent = 0;
                                let ret = columns.map((column, columnIndex) => {
                                    let ret = (
                                        <Block
                                            usageData={column.block}
                                            dimensions={{
                                                top: rowBrotherPercent * childsHeight + blockTextHeight * rowIndex,
                                                left: columnBrotherPercent * childsWidth + blockGap,
                                                height: row.percent * childsHeight + blockTextHeight + blockBorder,
                                                width: column.percent / row.percent * childsWidth + blockBorder,
                                            }}
                                            key={`${prefix}/${column.block.name}`}
                                            prefix={`${prefix}/${column.block.name}`}
                                        ></Block>
                                    );
                                    columnBrotherPercent += column.percent / row.percent;
                                    return ret;
                                })
                                rowBrotherPercent += row.percent;
                                return ret;
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
