import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from "../utils/utils";

export default class Axios {

    state={};
    //跨域获取天气Api
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    };
    //请求列表封装
    static requestList(_this,url,params){
        let data ={
            params:params,

        };
        this.ajax({
            url,
            data
        }).then((data)=>{
            if (data && data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
    static ajax(options) {
        //加载动画
      /*  let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block'
        }*/
        let baseApi = 'https://easy-mock.com/mock/5b90f09898dd927ce3890618/api';
        /*if(options.isMock){
            //模拟接口
            baseApi = 'https://easy-mock.com/mock/5b90f09898dd927ce3890618/api';
        }else {
            //真实接口
            baseApi=''
        }*/
        //Promise对象,方便我们调接口的时候通过then接受参数
        //Promise( (resolve,reject)=>{}) 里面接收一个回调函数,两个值 成功或失败resolve or reject
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 2000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                //请求成功关闭loading
              /*  if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none'
                }*/
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res)
                    } else {
                        // 错误时调用antd组件提示框
                        Modal.info({
                            title: '提示',
                            content: res.message
                        })
                    }
                } else {
                    reject('错误')
                }
            })

        })

    }


}