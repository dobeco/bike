import React from 'react';
import { Card, Table, Modal, Button, message, Badge } from 'antd';
import axios from './../../axios/index'
import Utils from './../../utils/utils';
export default class HighTable extends React.Component {

    state = {

    }
    params = {
        page:1
    }
    componentDidMount(){
        this.request();
    }

    // 动态获取mock数据
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

    handleChange = (pagination, filters, sorter)=>{
        console.log("::" + sorter);
        this.setState({
            sortOrder:sorter.order
        })
    };

    // 删除操作
    handleDelete = (item)=>{
       // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'您确认要删除此条数据吗？',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    };

    render(){
        const columns = [
            {
                title: 'id',
                key: 'id',
                width:80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'user_name',
                width: 80,
                dataIndex: 'user_name'
            },
            {
                title: '性别',
                key: 'sex',
                width: 80,
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                width: 80,
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1: '咸鱼',
                        2: '程序猿',
                        3: '射技师',
                        4: '创业者',
                        5: '风华浪子'
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                width: 80,
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
                    return config[interest];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                width: 80,
                dataIndex: 'time'
            }
        ]
        const columns2 = [
            {
                title: 'id',
                key: 'id',
                width: 80,
                fixed:'left',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'user_name',
                width: 80,
                fixed: 'left',
                dataIndex: 'user_name'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1: '咸鱼',
                        2: '程序猿',
                        3: '射技师',
                        4: '创业者',
                        5: '风华浪子'
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
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
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            }, {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                fixed: 'right',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                fixed: 'right',
                dataIndex: 'time'
            }
        ]
        const columns3 = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'user_name',
                dataIndex: 'user_name'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                key: 'age',
                dataIndex: 'age',
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1: '咸鱼',
                        2: '程序猿',
                        3: '射技师',
                        4: '创业者',
                        5: '风华浪子'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        1: '打篮球',
                        2: '看电影',
                        3: '听音乐',
                        4: '踢足球',
                        5: '跑步',
                        6: '爬山',
                        7: '麦霸',
                        8: '骑行',
                    }
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': <Badge status="success" text="成功"/>,
                        '2': <Badge status="error" text="报错" />,
                        '3': <Badge status="default" text="正常" />,
                        '4': <Badge status="processing" text="进行中" />,
                        '5': <Badge status="warning" text="警告" />
                    }
                    return config[state];
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
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '操作',
                render:(text,item)=>{
                    return <Button size="small" onClick={(item) => { this.handleDelete(item) }}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 2650 }}
                    />
                </Card>
                <Card title="表格排序" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}