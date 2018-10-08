import React from 'react'
import { Card,Spin, Icon, Alert} from  'antd'
import './ui.less'
export default class Loadings extends React.Component{

    render(){
        const icon = <Icon  type="loading" style={{fontSize:24}}/>
        const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="title"
                        description="前途是光明的，道路是曲折的，工作是轻松的的，赚钱是困难的，相爱是容易的，相处是艰难的。"
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="title"
                            description="如果别人朝你扔石头，就不要扔回去了，留着作你建高楼的基石。"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="title"
                            description="在这个穷的只剩下梦的时候，你一定要比别人更努力并一直坚持下去"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="title"
                            description="一个不努力实现自己价值的人，和破烂没什么区别"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}