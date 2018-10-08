import React from 'react'
import {Button, Card,Modal,Form,Input,Radio,Select,DatePicker} from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import ETable from './../../components/ETable'
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item;
const RadioGroup =Radio.Group;
const TextArea =Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component {

    params = {
        page: 1,
    };
    state = {};
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名',
            width: 80
        },
        {
            type: 'INPUT',
            label: '用户手机号',
            field: 'user_mobile',
            placeholder: '请输入用户手机号',
            width: 130
        },
        {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'user_date',
            placeholder: '请输入日期'
        }


    ];

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        axios.requestList(this, '/user/list', this.params)
    };
    handleFilter = (params) => {
        this.params = params;
        this.requestList();

    };

    //操作员工
    handleOperate = (type) => {
        if(type === 'cerate'){
            this.setState({
                type,
                isVisible:true,
                title:'出创建员工'
            })
        }
    };
    //创建员工提交
    handleSubmit= ()=>{

    };

    render() {
        const columns = [
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
                title: '手机号',
                dataIndex: 'user_mobile',

            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                    }[state];
                }
            },
            {
                title: '入职日期',
                dataIndex: 'user_date'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        dataSource={this.state.list}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={false}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isVisible:false
                        })
                    }}
                    width={600}
                >
                    <UserForm
                        type={this.state.type}
                        wrappedComponentRef={(inst)=>this.userForm=inst}
                    />

                </Modal>
            </div>
        )
    }
}
class UserForm extends React.Component{

    render(){
        const {getFieldDecorator}= this.props.form ;
        const formItemLayout= {
            labelCol:{span:5},
            wrapperCol:{span:19}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator('user_name')(
                            <Input type="text" placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>

                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator('sex')(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>

                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>咸鱼</Option>
                                <Option value={2}>程序猿</Option>
                                <Option value={3}>射技师</Option>
                                <Option value={4}>创业者</Option>
                                <Option value={5}>风华浪子</Option>
                            </Select>

                        )
                    }
                </FormItem>

                <FormItem label="入职时间" {...formItemLayout}>
                    {
                        getFieldDecorator('user_date')(
                            <DatePicker/>

                        )
                    }
                </FormItem>

                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        getFieldDecorator('address')(
                            <TextArea rows={3} placeholder="请输入联系地址"/>

                        )
                    }
                </FormItem>

            </Form>
        )

    }
}
UserForm = Form.create({})(UserForm);