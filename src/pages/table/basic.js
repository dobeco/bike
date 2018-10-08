import React from 'react'
import {Card, Table, Modal,Button,message} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

export default class Basic extends React.Component {
    state = {
        dataSource: []
    };
    params ={
        page:1
    };

    componentDidMount() {
        //静态表格数据
        const data = [
            {
                id: 1,
                user_name: 'Tom',
                sex: '0',
                state: '0',
                interest: '1',
                birthday: '2018-01-01',
                address: '北京市',
                time: '09:00'
            },
            {
                id: 2,
                user_name: 'Jack',
                sex: '1',
                state: '1',
                interest: '2',
                birthday: '2018-01-02',
                address: '北京市',
                time: '09:00'
            },
            {
                id: 3,
                user_name: 'Ming',
                sex: '1',
                state: '1',
                interest: '3',
                birthday: '2018-01-03',
                address: '北京市',
                time: '09:00'
            },
        ];
        data.map((item, index) => {
            return item.key = index
        });
        this.setState({
            data
        });
        this.request()
    };

    //动态获取数据 mock
    request = () => {
        let _this =this;
        axios.ajax({
            url: 'table/list',
            data: {
                params: {
                    page: this.params.page
                }

            }
        }).then((res) => {
            if (res.code === 0) {
                console.log(res);
                //设置表单的key值
                res.result.list.map((item, index) => {
                    return item.key = index
                });
                this.setState({
                    dataSource: res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page= current;
                        this.request()
                    })

                })
            }
        })
    };
    //单选
    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: `用户名: ${record.user_name} 爱好: ${record.interest}`
        });
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    };
    add = () => {
        let item = this.state.selectedItem;
        if (item.id) {

        }

    };
    //多选删除
    handleDelete = ()=>{
        let rows = this.state.selectedRows;
        let ids=[];
        rows.map((item)=>{
            return ids.push(item.id)
        });
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗? ${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request()

            }
        })

    };

    render() {
        //表格头部
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',

            },
            {
                title: '用户名',
                dataIndex: 'user_name',

            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }


            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1: '咸鱼',
                        2: '程序猿',
                        3: '射技师',
                        4: '创业者',
                        5: '风华浪子'
                    };
                    return config[state]
                }


            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        1: '打篮球',
                        2: '看电影',
                        3: '听音乐',
                        4: '踢足球',
                        5: '跑步',
                        6: '爬山',
                        7: '麦霸',
                        8: '骑行',
                    };
                    return config[interest]
                }


            },
            {
                title: '生日',
                dataIndex: 'birthday',


            },
            {
                title: '地址',
                dataIndex: 'address',


            },
            {
                title: '时间',
                dataIndex: 'time',
            }
        ];
        const {selectedRowKeys} = this.state;
        //单选
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        };
        //复选
        const rowCheckSelection ={
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })

            }

        };

        return (
            <div>
                {/*基础表格*/}
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.data}
                    />
                </Card>

                {/*动态表格*/}
                <Card title="动态表格" style={{margin: '20px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                {/*动态单选表格*/}
                <Card title="动态单选表格" style={{margin: '20px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}

                        dataSource={this.state.dataSource}
                    />
                </Card>

                {/*动态复选表格*/}
                <Card title="动态复选表格" style={{margin: '20px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        rowSelection={rowCheckSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }
                            }
                        }}
                        dataSource={this.state.dataSource}
                    />
                </Card>

                {/*表格自定义分页*/}
                <Card title="表格-自定义分页" style={{margin: '20px 0'}}>

                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                    />
                </Card>

            </div>

        )
    }
}